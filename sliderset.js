function sliderset(element, question, labels){
  /* Creates sliders, 1 per label */
  
  var maxpoints = labels.length * 5;
  
  var slidergroup = document.createElement('div');
  slidergroup.setAttribute('class', 'slidergroup');
  element.append(slidergroup);
  
  var questionlabel = document.createElement('p');
  questionlabel.innerHTML = question;
  slidergroup.append(questionlabel);
  
  var pointstext = document.createElement('p');
  pointstext.innerHTML = 'Points available: ';
  slidergroup.append(pointstext);
  
  var pointscount = document.createElement('span');
  pointscount.innerHTML = maxpoints;
  pointscount.setAttribute('class', 'pointscount');
  pointstext.append(pointscount);
  
  labels.forEach(function(label){
    var uniqueid = Date.now();
    
    var slidersection = document.createElement('div');
    slidergroup.append(slidersection);
    
    var slider = document.createElement('input');
    slider.setAttribute('type', 'range');
    slider.setAttribute('min', '0');
    slider.setAttribute('max', maxpoints);
    slider.setAttribute('step', '1');
    slider.setAttribute('value', '0');
    slider.setAttribute('id', uniqueid);
    slider.addEventListener('input', sliderupdate);
    slider.addEventListener('change', sliderupdate);
    slidersection.append(slider);
    
    var sliderlabel = document.createElement('label');
    sliderlabel.innerHTML = label;
    sliderlabel.setAttribute('for', uniqueid);
    slidersection.append(sliderlabel);
  })
}

function sliderupdate(element){
  /* Handles slider updates */
  
  this.element = element;
  var maxpoints = this.getAttribute('max');
  var slidergroup = this.parentElement.parentElement;
  var sliders = slidergroup.querySelectorAll('input');
  
  /* Prevent overspending points by adjusting other sliders back down */
  var sum = suminputs(sliders);
  while (sum > maxpoints){
    sliders.forEach(function(slider, index){
    	if (slider.element !== this.element){
      	slider.value -=1;
      }
      sum = suminputs(sliders);
    });
		/* var diff = sum - this.value;
    var newval = maxpoints - diff;
    this.value = newval; */
  }
  
  var sliderpercents = getvalspercent(sliders);
  var percentspent = sumarr(sliderpercents);
  var percentleft = ((1-percentspent) *100).toFixed(2) + '%';
  
  /* Update points count */
  var pointsavailable = maxpoints - sum;
  var pointscount = slidergroup.querySelector('.pointscount');
  pointscount.innerHTML = pointsavailable;
  console.log(sum, sliderpercents);
}

function suminputs(inputs){
  /* Return the sum of values of multiple elements */
  
  var elements = Array.from(inputs);
  var sum = elements.reduce(function (acc, curr) {
    return acc + Number(curr.value);
  }, 0);
  return sum;
}

function sumarr(array){
  /* Return the sum of an array of numbers */
  
  return array.reduce(function (acc, curr) {
    return acc + curr;
  }, 0);
}

function getvalspercent(inputs){
  /* Return an array of numbers representing the 
    percent of total points assigned to each slider */

  var elements = Array.from(inputs);
  var vals = [];
  elements.forEach(function(elem){
  	vals.push(elem.value/elem.getAttribute('max'));
  })
  return vals;
}
