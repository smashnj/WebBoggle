(function(){
	var Trie = window.Trie = {
		mainTrie: null,

		init: function (dictionary) {
			Trie.mainTrie = new Trie.Node();

			for (var i = 0, len = dictionary.length; i < len; i++) {
				Trie.insertWord(Trie.mainTrie, dictionary[i]);
			}
		},

		Node: function () {
			this.word = null;
			this.children = {};
		},

		range: function (start, end) {
			var arrRange = [];

			if (typeof end === 'undefined') {
				end   = start;
				start = 0; 
			}

			for (var i = start; i < end; i++) {
				arrRange.push(i);
			}
			
			return arrRange;
		},

		insertWord: function (node, word) {
			for (var i = 0, len = word.length; i < len; i++) {
				var letter = word[i];
				
				if (!node.children[letter]) {
					node.children[letter] = new Trie.Node();
				}

				node = node.children[letter];
			}

			node.word = word;
		},


		/**
		 * Method: searchWord
		 * Searches for a word inside the Trie structure and returns the entries matching the word, based on a maximum levenshtein distance cost
		 *
		 * Parameters:
		 * word - {String} the word we're searching for
		 * cost - {Number} the Levenshtein distance between the searched word and similar ones http://en.wikipedia.org/wiki/Levenshtein_distance
		 *
		 * Returns:
		 * {Array} an array with the matching words
		 */
		searchWord: function (word, cost) {
			var currentRow = Trie.range(word.length + 1);
			var	results    = [];

			for (var letter in Trie.mainTrie.children) {
				Trie.searchWordRecursive(Trie.mainTrie.children[letter], letter, word, currentRow, results, cost);
			}

			return results;
		},

		searchWordRecursive: function (node, letter, word, previousRow, results, maxCost) {
			var columns    = word.length + 1;
			var	currentRow = [previousRow[0] + 1];
			var	xrange     = Trie.range(1, columns);

			for (var i = 0, len = xrange.length; i < len; i++) {
				var column = xrange[i];

				var insertCost  = currentRow[column - 1] + 1;
				var	deleteCost  = previousRow[column] + 1;
				var	replaceCost = (word[column - 1] !== letter) ? previousRow[column - 1] + 1 : previousRow[column - 1];

				currentRow.push(Math.min(insertCost, deleteCost, replaceCost));
			}

			if (currentRow[currentRow.length - 1] <= maxCost && node.word) {
				results.push(node.word);
			}

			if (Math.min.apply(Math, currentRow) <= maxCost) {
				for (var letter in node.children) {
					Trie.searchWordRecursive(node.children[letter], letter, word, currentRow, results, maxCost);
				}
			}

		},

	}

})();