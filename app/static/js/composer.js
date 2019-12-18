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
draw_first_bar_of_tab(15)
var selectionSquare = two.makeRectangle(40, 140, 15, 15);
selectionSquare.fill = "yellow";
selectionSquare.opacity = 0.5;
selectionSquare.translation = new Two.Vector(40, 140);

// Group of first bar's drawing data.
var group = two.makeGroup(tablature);
group.translation.set(0, two.height / 4);
group.scale = 1;

document.onkeydown = function move(e) {
    e = e || window.event;

    switch (e.keyCode) {
        case 37:
            selectionSquare.translation.x -= 40;
            console.log('Left key pressed');
           break;
        case 38:
            selectionSquare.translation.y -= 15;
             console.log('Up key pressed');
           break;
        case 39:
            selectionSquare.translation.x += 40;
             console.log('Right key pressed');
           break;
        case 40:
            selectionSquare.translation.y += 15;
             console.log('Down key pressed');
           break;
     }
     this.onkeypress= function(ev){
        if(frets.includes(String.fromCharCode(ev.keyCode))) {
            two.makeText(String.fromCharCode(ev.keyCode), selectionSquare.translation.x, selectionSquare.translation.y)
            two.update()
        }
     }
     
     two.update();
}

two.update();