import { createHash } from 'node:crypto'

/**
 * pulled from https://futurestud.io/tutorials/node-js-calculate-a-sha256-hash
 * Returns a SHA256 hash using SHA-2 for the given `content`.
 *
 * @see https://en.wikipedia.org/wiki/SHA-2
 * 
 * @param {String} content
 *
 * @returns {String}
 */
export function sha256(content) {  
  return createHash('sha256').update(content).digest('hex')
}