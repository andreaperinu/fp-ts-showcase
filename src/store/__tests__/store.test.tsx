
import { AxiosResponse } from 'axios';
import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

import axios from '@/axios';
import { IBreedResponseMessage, IResponse } from '@/models/models';
import { useStore } from '@/store/store';
import * as mockedBreeds from '@/tests/mockedBreeds.json';
import { formatBreeds } from '@/utils/utils';
import { act, renderHook } from '@testing-library/react-hooks';

import {
	fetchBreeds, fetchImages, fetchRandomImage, resetImages, resetRandomImage
} from '../actions';

const axiosMock = jest.fn()

const imageUrl = 'random_image_url'
const imagesUrl = [imageUrl, 'random_image_url_2']

describe('useStore', () => {
	it('should fetch breeds', async () => {
		const resp: Partial<AxiosResponse<IResponse<IBreedResponseMessage>>> = {
			data: { message: mockedBreeds, status: 'ok' }
		}

		axiosMock.mockImplementation(() => Promise.resolve(resp))
		jest.spyOn(axios, 'get').mockImplementation(axiosMock)

		const { result, waitForNextUpdate } = renderHook(() => useStore())

		void act(() => { result.current[1](fetchBreeds()) })

		await act(async () => {
			expect(result.current[0].maybeBreeds).toEqual(O.none)

			await waitForNextUpdate();
			expect(result.current[0].maybeBreeds).toEqual(pipe(
				mockedBreeds, O.fromNullable, O.map(formatBreeds),
			))
		})
	})

	it('should fetch random image', async () => {
		const resp: Partial<AxiosResponse<IResponse<string>>> = {
			data: { message: imageUrl, status: 'ok' }
		}

		axiosMock.mockImplementation(() => Promise.resolve(resp))
		jest.spyOn(axios, 'get').mockImplementation(axiosMock)

		const { result, waitForNextUpdate } = renderHook(() => useStore())

		void act(() => { result.current[1](fetchRandomImage({ breed: '' })) })

		await act(async () => {
			expect(result.current[0].maybeRandomImage).toEqual(O.none)

			await waitForNextUpdate();
			expect(result.current[0].maybeRandomImage).toEqual(pipe(
				O.some(imageUrl),
			))
		})
	})

	it('should fetch random image', async () => {
		const resp: Partial<AxiosResponse<IResponse<string>>> = {
			data: { message: imageUrl, status: 'ok' }
		}

		axiosMock.mockImplementation(() => Promise.resolve(resp))
		jest.spyOn(axios, 'get').mockImplementation(axiosMock)

		const { result, waitForNextUpdate } = renderHook(() => useStore())

		void act(() => { result.current[1](fetchRandomImage({ breed: '' })) })

		await act(async () => {
			await waitForNextUpdate();
			expect(result.current[0].maybeRandomImage).toEqual(pipe(
				O.some(imageUrl),
			))

			void act(() => { result.current[1](resetRandomImage()) })

			await waitForNextUpdate();
			expect(result.current[0].maybeRandomImage).toEqual(O.none)
		})
	})

	it('should fetch images', async () => {
		const resp: Partial<AxiosResponse<IResponse<string[]>>> = {
			data: { message: imagesUrl, status: 'ok' }
		}

		axiosMock.mockImplementation(() => Promise.resolve(resp))
		jest.spyOn(axios, 'get').mockImplementation(axiosMock)

		const { result, waitForNextUpdate } = renderHook(() => useStore())

		void act(() => { result.current[1](fetchImages({ breed: '' })) })

		await act(async () => {
			expect(result.current[0].maybeImages).toEqual(O.none)

			await waitForNextUpdate();
			expect(result.current[0].maybeImages).toEqual(pipe(
				O.some(imagesUrl),
			))
		})
	})

	it('should reset images', async () => {
		const resp: Partial<AxiosResponse<IResponse<string[]>>> = {
			data: { message: imagesUrl, status: 'ok' }
		}

		axiosMock.mockImplementation(() => Promise.resolve(resp))
		jest.spyOn(axios, 'get').mockImplementation(axiosMock)

		const { result, waitForNextUpdate } = renderHook(() => useStore())

		void act(() => { result.current[1](fetchImages({ breed: '' })) })

		await act(async () => {
			await waitForNextUpdate();
			expect(result.current[0].maybeImages).toEqual(pipe(
				O.some(imagesUrl),
			))

			void act(() => { result.current[1](resetImages()) })

			await waitForNextUpdate();
			expect(result.current[0].maybeImages).toEqual(O.none)
		})
	})

	it('should return same state', async () => {
		const resp: Partial<AxiosResponse<IResponse<string[]>>> = {
			data: { message: imagesUrl, status: 'ok' }
		}

		axiosMock.mockImplementation(() => Promise.resolve(resp))
		jest.spyOn(axios, 'get').mockImplementation(axiosMock)

		const { result, waitForNextUpdate } = renderHook(() => useStore())

		void act(() => { result.current[1]({ type: 'unknown' as any }) })

		await act(async () => {
			const state = result.current[0]

			await waitForNextUpdate();
			expect(result.current[0]).toEqual(state)
		})
	})

	it('should not filter listeners', async () => {
		const { unmount } = renderHook(() => useStore(false))
		unmount()
	})
})
