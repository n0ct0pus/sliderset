# sliderset

This repository holds basic example functions for creating sets of sliders that allow users to spend points to indicate which of the labels applies to a given question. 

This approach often provides more nuanced information than simply asking someone to rank answers or asking them to rate each label independantly via separate questions.

### Example: 
  If I asked you how much you like cake from 0 to 10, you might say 10. 
  If I asked you how much you like pizza from 0 to 10 you might also say 10. 

  If I asked you to rank pizza and cake you might say pizza first, then cake. 

  With this approach I give you 2 sliders, each ranging from 0 to 10, but you only have 10 points to spend between them. 
  Let's say you put pizza at a 7 and cake at a 3. 
  This is a much richer set of information than either of the other approaches can gather. I can see that while you may like both; given the choice, you prefer pizza by a significant margin. 


```
var form = document.querySelector('#form');
sliderset(form, 'How much do you like each food?', ['Pizza', 'Cake', 'Icecream']);

sliderset(form, 'How about between these foods?', ['Hot dogs', 'Milkshakes']);
```


https://jsfiddle.net/h2qsk68v/
