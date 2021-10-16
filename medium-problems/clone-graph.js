/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */

 var cloneGraph = function(node) {
    let nodeMap = {};
    let unvisitedNodes = true;
    let nodeItem = node;
    while(unvisitedNodes === true) {
        const val = nodeItem.val;
        if (val in nodeMap === false) {
            nodeMap[val] = new Node(nodeItem.val, [])
            nodeItem.neighbors.forEach(neighbor => {
                nodeMap[val].neighbors.push(neighbor.val)
            })
        }
        // Use the first unvisited node
        unvisitedNodes = false;
        nodeItem.neighbors.forEach(neighbor => {
            if (neighbor.val in nodeMap === false) {
                nodeItem = neighbor;
                unvisitedNodes = true;
            }
        });
    }

    for(idx in nodeMap) {
        let neighbors = []; 
        nodeMap[idx].neighbors.forEach(neighbor => {
            neighbors.push(nodeMap[neighbor]);
        });
        nodeMap[idx].neighbors = neighbors;
    }
    return nodeMap[1];
};