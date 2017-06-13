# -*- coding: utf-8 -*-

print ('start')

wordsFile = open('dictionary.txt', 'r')
inputWords = wordsFile.read()
print ('words file opened')

words = inputWords.split()
print ('words split')

i = 0
wordDictionaryTxt = 'var dictionary = [];\n'

for word in words:

    wordDictionaryTxt += 'dictionary[' + str(i) +'] = "' + word + '";\n'
    i = i + 1

print ('dictionary generated')

outputWords = open('dictionary.js', 'w')
outputWords.write(wordDictionaryTxt)
outputWords.close()
print ('dictionary written to file')

print ('done')
