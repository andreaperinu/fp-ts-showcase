import {
	FETCH_BREEDS, FETCH_IMAGES, FETCH_RANDOM_IMAGE, RESET_IMAGES, RESET_RANDOM_IMAGE
} from '@/store/actions/rawActions';
import { Action } from '@/store/types';

export type BreedPayload = { breed: string }

export const fetchBreeds: Action = () => ({ type: FETCH_BREEDS })
export const fetchRandomImage: Action<BreedPayload> = (payload) => (
	{ type: FETCH_RANDOM_IMAGE, payload }
)

export const resetRandomImage: Action = () => ({ type: RESET_RANDOM_IMAGE })
export const resetImages: Action = () => ({ type: RESET_IMAGES })

export const fetchImages: Action<BreedPayload> = (payload) => ({ type: FETCH_IMAGES, payload })
