var most_likely_pre = [['you', 'will', 'come', 'to', 'me'],['he', 'had', 'to', 'be', 'taken'],['in', 'order', 'to', 'get', 'to'],['it', 'is', 'not', 'necessary', 'to'],['she', 'could', 'not', 'understand', 'how'],['a', 'great', 'deal', 'more', 'of'],['that', 'he', 'had', 'done', 'his'],['be', 'able', 'to', 'believe', 'that'],['did', 'not', 'know', 'that', 'his'],['that', 'he', 'would', 'not', 'understand'],['it', 'was', 'not', 'so', 'with'],['he', 'went', 'back', 'to', 'his'],['and', 'it', 'was', 'just', 'as'],['that', 'in', 'spite', 'of', 'his'],['he', 'felt', 'that', 'he', 'was'],['to', 'know', 'what', 'to', 'do'],['as', 'well', 'as', 'in', 'the'],['the', 'rest', 'of', 'the', 'world'],['and', 'you', 'will', 'not', 'be'],['there', 'was', 'no', 'time', 'to']]

var mid_likely_pre = [['take', 'a', 'quiet', 'minute', 'and'],['the', 'slow', 'rise', 'of', 'the'],['met', 'though', 'he', 'and', 'my'],['most', 'famous', 'is', 'a', 'diligent'],['are', 'my', 'comfort', 'and', 'some'],['them', 'that', 'both', 'human', 'nature'],['enemy', 'made', 'a', 'last', 'desperate'],['connected', 'with', 'the', 'wilderness', 'campaign'],['the', 'race', 'statistics', 'of', 'the'],['something', 'dreadful', 'has', 'happened', 'to'],['with', 'no', 'obstruction', 'between', 'us'],['she', 'might', 'risk', 'such', 'a'],['stood', 'in', 'corner', 'and', 'was'],['book', 'and', 'try', 'not', 'only'],['can', 'thank', 'you', 'enough', 'for'],['capture', 'it', 'again', 'and', 'give'],['shall', 'regard', 'them', 'as', 'having'],['lust', 'of', 'adventure', 'and', 'in'],['notable', 'that', 'though', 'she', 'never'],['that', 'her', 'temper', 'is', 'intractable']]

var least_likely_pre = [['choppers', 'would', 'load', 'and', 'some'],['aggressions', 'upon', 'the', 'south', 'its'],['idealize', 'our', 'romance', 'and', 'our'],['coaling', 'company', 'has', 'paid', 'its'],['southernly', 'world', 'which', 'had', 'centuries'],['ineptitudes', 'or', 'thinks', 'the', 'worse'],['falsifies', 'for', 'itself', 'certain', 'traits'],['concatenation', 'of', 'circumstances', 'needed', 'the'],['vociferating', 'oaths', 'dreadful', 'to', 'hear'],['moralities', 'our', 'actions', 'shine', 'alternately'],['turquoise', 'rings', 'would', 'not', 'console'],['summarize', 'his', 'views', 'as', 'he'],['concessionnaires', 'are', 'in', 'question', 'goes'],['learner', 'or', 'will', 'attach', 'himself'],['fielding', 'displayed', 'a', 'quiet', 'gentle'],['foreword', 'this', 'little', 'volume', 'the'],['ornamental', 'rim', 'to', 'the', 'pipe'],['imminently', 'his', 'avaricious', 'and', 'unfeeling'],['shaper', 'and', 'author', 'of', 'environment'],['menageries', 'under', 'it', 'as', 'children']]

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function get_trial_text(ordered, shuffled) {
	var random_words_string = shuffled.join(' </a><a>');
	var random_words_string = '<a>' + random_words_string + '</a>'
	var output_1 = '"<p id=\'word-choices\'>'+random_words_string+"</p>"
	var output_2 = "<p>"
	ordered.forEach(function(each){
		output_2 += "%" + each + "%"
	})
	output_2 += '</p><button class=\'randomize\'>Randomize word order</button><button class=\'clear\'>Clear</button>"'
	return output_1+output_2
}	

function fill_array(fill_from) {
	final_array = []
	fill_from.forEach(function(each){
		ordered = each.slice()
		shuffled = shuffle(each)
		final_array.push({'text': get_trial_text(ordered, shuffled)})
	})
	return final_array
}

var most_likely = fill_array(most_likely_pre)
var mid_likely = fill_array(mid_likely_pre)
var least_likely = fill_array(least_likely_pre)
