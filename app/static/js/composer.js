// Initializing all base variables
var notes = ['e', 'B', 'G', 'D', 'A', 'E']
var elem = document.getElementById('draw-group');
var two = new Two({ width: 600, height: 200 }).appendTo(elem);
var frets = new Array;

for (let fret = 0; fret < 25; fret++) {
    frets.push(fret.toString())    
}

// Creating an array to store drawing data. Styles for the text's style.
var styles = {"size":13, "fill": "rgba(0,0,0,0.5)", "style":"bold", "family":"sans-serif"}
var tablature = new Array;

// Draws the first bar of our tablature.
// Parameter is an int. Number of pixel for the interval between the tab lines.
// TODO: Make it dynamic depending on number of notes/subdivision/time signature.
function draw_first_bar_of_tab(distance){
    for (let i = 0; i < notes.length; i++) {
        var dist = i+1;
        var line = two.makePath(20, dist * distance, 180, dist * distance);
        line.linewidth = 2;
        line.opacity = 0.4;
        tablature.push(two.makeText(notes[i], 10, dist *distance, styles));
        tablature.push(line);
    }
    var endline = two.makePath(181, 15, 181, 90);
    endline.linewidth = 2;
    endline.opacity = 0.5;
    tablature.push(endline)
}


function check_if_note_translation_in_array(note) {
    var not = [note.x, note.y] ;
    var item_as_string = JSON.stringify(not);
    var contains = noteTranslate.some(function(ele){
        return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}


draw_first_bar_of_tab(15)
var selectionSquare = two.makeRectangle(40, 140, 15, 15);
selectionSquare.fill = "yellow";
selectionSquare.opacity = 0.5;
selectionSquare.translation = new Two.Vector(40, 140);

// Group of first bar's drawing data.
var group = two.makeGroup(tablature);
group.translation.set(0, two.height / 4);
group.scale = 1;


// notes position and value data
var noteData = new Array;
var noteTranslate = new Array;
function note_to_del(){
    var trans = [selectionSquare.translation.x, selectionSquare.translation.y]
    for (var ix = 0; ix< noteTranslate.length; ix++){
        if(JSON.stringify(trans) === JSON.stringify(noteTranslate[ix])){
            var elem = noteData[ix]._matrix.elements;
            noteTranslate.splice(ix, 1)
            noteData.splice(ix, 1)
            console.log("deleted")
            return elem;
        }
    }
    }

//TODO: Detect and delete notes.
document.onkeydown = function move(e) {
    e = e || window.event;

    switch (e.keyCode) {
        case 37:
            if(selectionSquare.translation.x > 40){
            selectionSquare.translation.x -= 40;
            
            }
           break;
        case 38:
            if(selectionSquare.translation.y > 65){
            selectionSquare.translation.y -= 15;
            
            }
           break;
        case 39:
            selectionSquare.translation.x += 40;
            
           break;
        case 40:
            if(selectionSquare.translation.y < 140 ){
            selectionSquare.translation.y += 15;
            
            }
           break;
     }
     
     this.onkeypress= function(ev){
        if(frets.includes(String.fromCharCode(ev.keyCode)) && !check_if_note_translation_in_array(selectionSquare.translation)) {
            noteTranslate.push([selectionSquare.translation.x, selectionSquare.translation.y])
            noteData.push(two.makeText(String.fromCharCode(ev.keyCode), selectionSquare.translation.x, selectionSquare.translation.y))
            two.update()
        }
        else {
                if(e.keyCode == 46 || e.keyCode == 8){
                    
                    var to_delete = note_to_del(selectionSquare.translation)
                    // Our Saviour : noteData[1]._matrix.elements == two.scene._children.ids["two_17"]._matrix.elements
                    // This is the only piece of code that truly matters.
                    // This is the God Code.
                    for(var obj in two.scene._children.ids){
                        if (two.scene._children.ids[obj]._matrix.elements == to_delete){
                            two.scene._children.ids[obj].remove()
                        }
                    }
                    
                    two.update()
                }
            }
        }
     
     
     console.log("coord : " + selectionSquare.translation.x + " : " + selectionSquare.translation.y)
     two.update();
}
var saveData = {"noteslist":noteData, "notescoordinates":noteTranslate};
two.update();
