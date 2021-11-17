///////////////////////////////////////////////////////////////////////////////
// Priority queue item
class QItem {
	constructor(item, priority) {
		this.item = item;
		this.priority = priority;
	}
}

///////////////////////////////////////////////////////////////////////////////
// Priority queue implementation
class PriorityQueue {
	constructor() {
		this.items = [];
	}

	push(element, priority) {
		let item = new QItem(element, priority);
		let i = 0;

		for(;i < this.items.length; i++) {
			if(this.items[i].priority > item.priority) {
				this.items.splice(i, 0, item);
				break;
			}
		}
		if (i === this.items.length) {
			this.items.push(item);
		}
	}

	isEmpty() {
		return this.items.length === 0;
	}

	pop() {
		if (this.isEmpty() === true) {
			return null;
		}
		return this.items.shift();
	}

	front() {
		if (this.isEmpty() === true) {
			return null;
		}
		return this.items[0];
	}

	update(value, newPriority) {
		for(let i = 0; i < this.items.length; i++) {
			let item = this.items[i];
			if (item.item == value) {
				this.items.splice(i, 1);
				break;
			}
		}
		this.push(value, newPriority);
	}

	rear() {
		if (this.isEmpty() === true) {
			return null;
		}
		return this.items[this.items.length - 1];
	}
}

class Edge {
	constructor(dest, weight) {
		this.dest = dest;
		this.weight = weight;
	}
}


///////////////////////////////////////////////////////////////////////////////
// Implementation of the greedy path finding algorithm
function getLowestWeight(edges, graph) {
	if (edges.length === 0) {
		return '';
	}
	let weight = Number.MAX_SAFE_INTEGER;
	let nextNode = '';
	for(let i = 0; i < edges.length; i++) {
		if (weight > edges[i].weight && edges[i].dest in graph) {
			weight = edges[i].weight;
			nextNode = edges[i].dest;
		}
	}
	return nextNode;
}

function greedyShortestPath(graph, start, dest) {
	let path = [];
	let nextDest = start;
	path.push(start);
	while(nextDest !== dest && nextDest !== '') {
		let prevDest = nextDest;
		nextDest = getLowestWeight(graph[nextDest], graph);
		if (nextDest !== '') {
			path.push(nextDest);
			delete graph[prevDest];
		}
	}
	return path;
}

///////////////////////////////////////////////////////////////////////////////
// Implementation of Dijkstra's Shortest Path
function dijkstraPath(graph, start, dest) {
	let queue = new PriorityQueue();
	let paths = {};
	let visited = {};
	let nodes = Object.keys(graph);

	nodes.forEach(node => {
		paths[node] = {'from': node, 'weight': Number.MAX_SAFE_INTEGER};
		visited[node] = false;
	})

	// Resetting weightback to 0 and pushing the start node into the queue.
	paths[start].weight = 0;
	queue.push(start, 0);

	// While the queue is not empty, examine the paths.
	while(queue.isEmpty() === false) {
		const item = queue.pop();
		const node = item.item;
		const weight = item.priority;
		const nodePaths = graph[node];
		
		for(let i = 0; i < nodePaths.length; i++) {
			const path = nodePaths[i];
			
			// If we haven't visited the node of interest and the weight to get
			// there is smaller than what's currently there, update the 
			// priority queue
			if (visited[path.dest] === false) {
				let newPathWeight = path.weight + weight;
				if (newPathWeight < paths[path.dest].weight) {
					paths[path.dest].from = node;
					paths[path.dest].weight = newPathWeight;
					queue.update(path.dest, paths[path.dest].weight);
				}
			} 
		}
		visited[node] = true;
	}
	// console.log(`Paths: ${JSON.stringify(paths, null, 4)}`);
	// If the destination was visited, then the graph is connected, so we can
	// plot a path between it and the start point.
	if (visited[dest] === true) {
		let path = [dest];
		while(dest != start) {
			dest = paths[dest].from;
			path.unshift(dest);
		}
		return path;
	}
	else {
		return [];
	}
}

///////////////////////////////////////////////////////////////////////////////
// Stuff to run the above
// let graph = {
// 	'a': [new Edge('b', 5), new Edge('c', 3), new Edge('e', 2)],
// 	'b': [new Edge('d', 2)],
// 	'c': [new Edge('b', 1), new Edge('d', 1)],
// 	'd': [new Edge('a', 1), new Edge('g', 2), new Edge('h', 1)],
// 	'e': [new Edge('a', 1), new Edge('h',4), new Edge('i', 7)],
// 	'f': [new Edge('b', 3), new Edge('g', 1)],
// 	'g': [new Edge('c', 3), new Edge('i', 2)],
// 	'h': [new Edge('c', 2), new Edge('f', 2), new Edge('g', 2)],
// 	'i': [],
// };
let graph = {
	's': [new Edge('a', 7), new Edge('b', 2), new Edge('b', 3)],
	'a': [new Edge('b', 3), new Edge('d', 4), new Edge('s', 7)],
	'b': [new Edge('a', 3), new Edge('d', 4), new Edge('h', 1), new Edge('s', 2)],
	'c': [new Edge('l', 2), new Edge('s', 3)],
	'd': [new Edge('a', 4), new Edge('b', 4), new Edge('f', 5)],
	'e': [new Edge('g', 2), new Edge('k', 5)],
	'f': [new Edge('d', 5), new Edge('h', 3)],
	'g': [new Edge('e', 2), new Edge('h', 2)],
	'h': [new Edge('b', 1), new Edge('f', 3), new Edge('g', 4)],
	'i': [new Edge('j', 6), new Edge('k', 4), new Edge('l', 4)],
	'j': [new Edge('i', 6), new Edge('k', 4), new Edge('l', 4)],
	'k': [new Edge('e', 5), new Edge('i', 4), new Edge('j', 4)],
	'l': [new Edge('c', 2), new Edge('i', 4), new Edge('j', 4)],
};
let start = 's';
let dest = 'e';
//greedyShortestPath(graph, start, dest); // This mutates the graph
dijkstraPath(graph, start, dest);