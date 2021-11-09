/* This is based on a mock interview question from YouTube 
* The problem: You are looking for a place to live along a road with a number
* of blocks. Each block contains a place to live (apartment, house, etc) and
* may contain a place that provides a service you're interested in (school, 
* grocery, gym, etc.). Develop a method to find the shortest maximum distance
* you would have to travel to get to any of the required services you want.
*/

/** Input values */
const inputBlocks = [
	{
		"school": false,
		"grocery": true,
		"gym": false,
	},
	{
		"school": true,
		"grocery": false,
		"gym": false,
	},
	{
		"school": true,
		"grocery": true,
		"gym": false,
	},
	{
		"school": false,
		"grocery": false,
		"gym": true,
	},
	{
		"school": true,
		"grocery": true,
		"gym": false,
	},
	{
		"school": false,
		"grocery": true,
		"gym": false,
	},
];

const inputReqs = ["school", "grocery", "gym"];

/** Methods */

/**
 * Checks to see which requirements are met by the block, updating an object
 * and returning it.
 * @param {*} block - Current block
 * @param {*} reqs - Array of requirements
 * @param {*} reqsMet An object containing the requirements as keys and a
 * 					boolean if the requirment was met.
 * @returns reqsMet that's been updated
 */
function checkBlock(block, reqs, reqsMet) {
	for(let i =0; i < reqs.length; i++) {
		const req = reqs[i];
		reqsMet[req] = (reqsMet[req] || block[req] === true);
	}
	return reqsMet;
}

/**
 * Checks if all the requirements are met
 * @param {*} reqsMet 
 * @param {*} reqs 
 * @returns 
 */
function checkAllReqsMet(reqsMet, reqs) {
	let metCount = 0;
	for(let i = 0; i < reqs.length; i++) {
		if(reqsMet[reqs[i]] === true) { metCount ++; };
	}
	return metCount === reqs.length;
}

/**
 * Finds which block meets all the requirements with the lowest maximum 
 * distance one has to travel.
 * 
 * Things to keep track of:
 * - Which block meets the requirements with the smallest maximum distance.
 * - Maximum distance last traveled to meet all requirements (maxDist)
 * 
 * For each block:
 * 1. Check which services are met by the block.
 *   - If all services are met by this block, we're done.
 * 2. Check the block's neighbors and see which services are met by those
 *    blocks
 * 3. The check those neighbors' neighbors, and repeat until all requirements
 *    are met
 * 4. Check to see how far the last block that met the requirements is from
 *    the starting block
 * 5. If this distance is smaller than maxDist, set maxDist to this and store
 *    which block this is
 * 6. Continue on until all blocks are considered.
 * 7. Return the block number with the smallest maxDist
 * 
 * Where n is the number of blocks and m is the number of requirements:
 * Worst case is O(m * n^2), since every block is considered against the other
 * blocks.
 * 
 * @param {*} blocks 
 * @param {*} reqs 
 * @returns 
 */
function findBestBlock(blocks, reqs) {
	let bestBlock = -1;
	let maxDist = blocks.length;

	for(let blockNum = 0; blockNum < blocks.length; blockNum++) {
		let dist = 0;
		let allReqsMet = false;
		const block = blocks[blockNum];

		// Get what the current block provides
		let reqsMet = checkBlock(block, reqs, {});
		allReqsMet = checkAllReqsMet(reqsMet, reqs);

		// If the block has everything already, we're done
		if(allReqsMet === true) {
			bestBlock = blockNum;
			break;
		}

		for(dist = 1; dist < maxDist && allReqsMet === false; dist++) {
			const prevIdx = blockNum - dist;
			const nextIdx = blockNum + dist;
			// Check the previous block dist blocks away
			if (prevIdx > -1) {
				reqsMet = checkBlock(blocks[prevIdx], reqs, reqsMet);
			}
			// Check the next block dist blocks away
			if (nextIdx < maxDist) {
				reqsMet = checkBlock(blocks[nextIdx], reqs, reqsMet);
			}
			allReqsMet = checkAllReqsMet(reqsMet, reqs);
		}

		if (dist < maxDist) {
			maxDist = dist;
			bestBlock = blockNum;
		}
	}

	return bestBlock;
}

findBestBlock(inputBlocks, inputReqs);