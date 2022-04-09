import { LIVE } from './const';

export const streamLive = data => ({
    type: LIVE,
    payload: data
})