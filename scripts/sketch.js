/* This will create the grid */
const Grid = document.getElementById('grid');

create_grid(30,58)
function create_grid(row,col){
    for(var i = 0; i < row; i++){
        var row_list = document.createElement('tr');
        for(var j = 0; j < col ; j++){
            var cell = document.createElement('td');
            cell.setAttribute('id',i+"-"+j); // row (i) column (j)
            cell.classList.add('unvisited')
            row_list.appendChild(cell);
        }
    Grid.appendChild(row_list);
    }
}

/* This is to create starting node and end node  */

/* Starting Node */
const add_node = document.getElementById('15-11');
add_node.removeAttribute('class');
add_node.classList.add('Starting-Node');
add_node.style.backgroundColor = 'red' ;
add_node.setAttribute('draggable', 'true');

/* Ending Node */
const end_node = document.getElementById('15-46');
end_node.removeAttribute('class');
end_node.classList.add('Ending-Node');
end_node.style.backgroundColor = 'purple';
end_node.setAttribute('draggable', 'true');


/* Dragging node to put on diff position */
var drag_start_node = document.querySelector('.Starting-Node');
var drag_end_node = document.querySelector('.Ending-Node');
const list_position = document.querySelectorAll('td');

/* Executing the drag and drop for the starting node and ending node */

/* Event Listener for dragging */

drag_start_node.addEventListener('dragstart', dragstart);
drag_start_node.addEventListener('dragend', dragend);
drag_end_node.addEventListener('dragstart', dragstart_);
drag_end_node.addEventListener('dragend', dragend_);

/* Function to drag */

let previous_node_list = [] /* This list is to input the previous column and act as a memory for the code */

function dragstart() {
    if (this.className === 'Starting-Node'){
        previous_node_list.push(this.id);
        setTimeout(function () {
            drag_start_node.style.backgroundColor = 'white';

        }, 0);
    }else{
        console.log('error start');
    }
};

function dragstart_() {
    if (this.className === 'Ending-Node'){
        previous_node_list.push(this.id);
        setTimeout(function () {
            drag_end_node.style.backgroundColor = 'white';
        }, 0);
    }else{
        console.log('error end');
    }
};

function dragend() {
    previous_node_list = []
    if (this.className === 'Starting-Node'){
        setTimeout(function () {
            drag_start_node.style.backgroundColor = 'red';
        }, 0)
    };
    drag_start_node = document.querySelector('.Starting-Node');
    drag_start_node.addEventListener('dragstart', dragstart);
    drag_start_node.addEventListener('dragend', dragend);
};

function dragend_() {
    previous_node_list = []
    if (this.className === 'Ending-Node'){
        setTimeout(function () {
            drag_end_node.style.backgroundColor = 'purple';
        }, 0)
    };
    drag_end_node = document.querySelector('.Ending-Node');
    drag_end_node.addEventListener('dragstart', dragstart_);
    drag_end_node.addEventListener('dragend', dragend_);
};

/* Event Listener for dragging motion */

for (let j = 0; j < list_position.length; j++) {

    const emp = list_position[j];

    emp.addEventListener('dragover', DragOver);
    emp.addEventListener('dragenter', DragEnter);
    emp.addEventListener('dragleave', DragLeave);
    emp.addEventListener('drop', DragDrop);
};

/* Function for the drag motion */

function DragOver(e) {
    e.preventDefault();
};

function DragEnter(e) {
    e.preventDefault();
    
    try{
        const dragging = document.getElementById(dragging_item[0])
        if (dragging.className === 'unvisited _wall'){
            if (this.className === 'unvisited'){
                this.classList.add('_wall');
                this.style.backgroundColor = 'grey';
                this.setAttribute('draggable', 'true');
                this.addEventListener('dragstart', dragstart_wall);
                this.addEventListener('dragend', dragend_wall);
            }
        }
    }
    catch(err){

    }
};

function DragLeave(e) {
    e.preventDefault();
};

function DragDrop(e) {

    const check_node = document.getElementById(previous_node_list[0]);

    try{
        if (check_node.className === 'Starting-Node'){
            // putting into the 'memory'
    
            previous_node_list.push(this.id);
    
            // removing the previous node
    
            const previous_node = document.getElementById(previous_node_list[0]);
    
            previous_node.removeAttribute('class');
            previous_node.removeAttribute('draggable');
            previous_node.removeAttribute('style');
            previous_node.classList.add('unvisited');
            previous_node_list.shift();
    
            // adding new starting point 
    
            const new_starting_node = document.getElementById(this.id);
            new_starting_node.removeAttribute('class');
            new_starting_node.classList.add('Starting-Node');
            new_starting_node.style.backgroundColor = 'red';
            new_starting_node.setAttribute('draggable', 'true');
        }else if(check_node.className === 'Ending-Node'){
            // putting into the 'memory'
    
            previous_node_list.push(this.id);
    
            // removing the previous node
    
            const previous_node = document.getElementById(previous_node_list[0]);
    
            previous_node.removeAttribute('class');
            previous_node.removeAttribute('draggable');
            previous_node.removeAttribute('style');
            previous_node.classList.add('unvisited');
            previous_node_list.shift();
    
            // adding new starting point 
    
            const new_starting_node = document.getElementById(this.id);
            new_starting_node.removeAttribute('class');
            new_starting_node.classList.add('Ending-Node');
            new_starting_node.style.backgroundColor = 'purple';
            new_starting_node.setAttribute('draggable', 'true');
        };
    }
    catch(err){
        
    }
};

/* Function to drag and make wall */

var drag_wall = document.querySelectorAll('.unvisited');

for (let i = 0 ; i<drag_wall.length ; i++){

    drag_wall[i].addEventListener('click', click_wall);
};

let wall_list_clicked = []
function click_wall(){
    if(this.className === 'unvisited'){
        this.classList.add('_wall')
        this.setAttribute('draggable', 'true');
        this.style.backgroundColor = 'grey';
        const grey_wall = document.getElementById(this.id);
        grey_wall.addEventListener('dragstart', dragstart_wall);
        grey_wall.addEventListener('dragend', dragend_wall);
    }else if( this.className === 'unvisited _wall'){
        this.removeAttribute('class');
        this.removeAttribute('draggable');
        this.removeAttribute('style');
        this.classList.add('unvisited');

    };
};

let dragging_item = []

function dragstart_wall(){
    if (this.className === 'unvisited _wall'){
        this.style.backgroundColor = 'grey';
        dragging_item.push(this.id);
    };
};

function dragend_wall(){
    if (this.className === 'unvisited _wall'){
        this.style.backgroundColor = 'grey';
        dragging_item.shift();
    };
};

/* Function to make clear walls */

const clear_wall_btn = document.querySelector('.clear_wall');

clear_wall_btn.addEventListener('click', ClearWall);

function ClearWall(e){

    e.preventDefault();

    try{
        const walls = document.getElementsByClassName('unvisited _wall');
    
        var rubbish_list = []

        for (i = 0 ;i <= walls.length ; i++){
            rubbish_list.push(walls[i]);
        }
        
        rubbish_list.forEach(function(x){
            x.removeAttribute('class');
            x.removeAttribute('style');
            x.removeAttribute('draggable');
            x.classList.add('unvisited');
        })

        rubbish_list = []
    }
    catch(err){
    }
};

/* Function to make A* Algo */

const visualize = document.querySelector('.execute');

visualize.addEventListener('click', run_Algo);

function run_Algo(e){

    e.preventDefault();
    
    const starting_node = document.querySelector('.Starting-Node');
    const ending_node = document.querySelector('.Ending-Node');

    // list for open node ( open nodes are the node to check surrounding node) and close node ()

    const starting_coordinate = into_coor(starting_node);
    const ending_coordinate = into_coor(ending_node); 
    var current_node = [];
    var open_node = [];
    var close_node = [];
    var visited_node = [];
    
    // first step putting starting node into current node list 

    current_node.push(starting_coordinate);

    // This function is to check two array izit the same 

    function arrayEquals(a, b) {
        return Array.isArray(a) &&
            Array.isArray(b) &&
            a.length === b.length &&
            a.every((val, index) => val === b[index]);
    }
    
    // Loop should start here

    while (arrayEquals(current_node[0], ending_coordinate) === false){
        
        const surrounding_node = get_surr_coor(current_node);

        // second step finding the G cost , H cost and F cost 
        
        for ( let i = 0; i < surrounding_node.length; i++){

            const check_i = surrounding_node[i];

            const G_cost = cal_cost(check_i, starting_coordinate);
            const H_cost = cal_cost(check_i, ending_coordinate);
            const F_cost = G_cost + H_cost;

            var checking_similar = false

            // check whether izit in close node
            if(close_node.length>0){
                for( let i = 0 ; i < close_node.length; i++){

                    checking_similar = arrayEquals(check_i,[close_node[i][3],close_node[i][4]]);

                    if(checking_similar === true){
                        
                        if(F_cost < close_node[i][2]){
                            close_node[i][0] = G_cost;
                            close_node[i][1] = H_cost;
                            close_node[i][2] = F_cost;
                            close_node[i][5] = current_node[0][0];
                            close_node[i][6] = current_node[0][1];
                        };

                        break
                    }
                }
                
                if(checking_similar === false){
                    open_node.push([G_cost, H_cost, F_cost, check_i[0], check_i[1],current_node[0][0], current_node[0][1]])
                }

            }else{
                open_node.push([G_cost, H_cost, F_cost, check_i[0], check_i[1],current_node[0][0], current_node[0][1]]);
            }
        
        };

        close_node = close_node.concat(open_node);
        
        open_node = [];

        // comparing f cost to pick to visit to become the next current node

        const compare_F_cost = []; // a list to compare f-cost

        for ( let i = 0; i < close_node.length; i++){

            const close_node_i = close_node[i][2];
            compare_F_cost.push(close_node_i);
        };

        const next_node = best_next_node(compare_F_cost, close_node);

        for(let i = 0; i < close_node.length; i++){

            const close_node_coor = [close_node[i][3],close_node[i][4]];

            if(arrayEquals(close_node_coor, next_node)===true){
                visited_node.push(close_node[i].slice(3,7));
                close_node.splice(i,1);
                break
            }
        }

        const change_status = document.getElementById(next_node[0]+'-'+next_node[1]);

        change_status.removeAttribute('class');
        change_status.classList.add('visited');
        
        current_node = [next_node] ;

    };

    var coor = ending_coordinate;

    var path = [];

    const current = [];

    const previous = [];

    visited_node.forEach(function(x){
        current.push([x[0],x[1]]);
        previous.push([x[2],x[3]]);
    })

    while(arrayEquals(coor, starting_coordinate) === false){
       
        for(let i = 0; i < current.length; i++){
            if(arrayEquals(coor, current[i])===true){
                coor = previous[i];
                break
            }
        }


        path.push(coor)

    }
    path.pop();


    for(let j = 0; j < path.length; j++){

        const color_path = document.getElementById(path[j][0] + '-' + path[j][1]);

        color_path.removeAttribute('class');
        color_path.classList.add('path');
        color_path.style.backgroundColor = 'yellow';
    }
};

/* Function to split id into 2D array */

function into_coor(node){
    return node.id.split('-').map(Number);
};

/* Function to check up right left down */ 
// Alaways have to check whether the node is a wall 
// If is a wall then it wont be added to the the surr_node_coor
// if node alrd in close node need to do checking 

function get_surr_coor(x){

    const coor_current_node = x[0];

    const surrounding_node_coor = [];

    // up 
    const row_up = coor_current_node[0] - 1 ; 
    const column_up = coor_current_node[1] ;
    
    if(check_wall(row_up,column_up) === 'unvisited _wall' || check_wall(row_up,column_up) === 'Starting-Node' || check_wall(row_up,column_up) === 'visited'){

    }else{
        surrounding_node_coor.push([row_up, column_up]); 
    };
    
    // down

    const row_down = coor_current_node[0] + 1 ;
    const column_down = coor_current_node[1] ; 

    if(check_wall(row_down,column_down) === 'unvisited _wall' || check_wall(row_down,column_down) === 'Starting-Node' || check_wall(row_down,column_down) === 'visited'){

    }else{
        surrounding_node_coor.push([row_down, column_down]); 
    };

    // right

    const row_right = coor_current_node[0] ; 
    const column_right = coor_current_node[1] + 1 ;

    if(check_wall(row_right,column_right) === 'unvisited _wall' || check_wall(row_right,column_right) === 'Starting-Node' || check_wall(row_right,column_right) === 'visited'){

    }else{
        surrounding_node_coor.push([row_right, column_right]); 
    };
    
    // left

    const row_left = coor_current_node[0] ;
    const column_left = coor_current_node[1] - 1 ;

    if(check_wall(row_left,column_left) === 'unvisited _wall' || check_wall(row_left,column_left) === 'Starting-Node' || check_wall(row_left,column_left) === 'visited'){

    }else{
        surrounding_node_coor.push([row_left, column_left]); 
    };

    return surrounding_node_coor ; 

};

// Function to check wall

function check_wall(row,column){

    const check_wall = document.getElementById(row + '-' + column);

    return  check_wall.className
};

/* Function to calculate G-cost (distance from starting node) and H-cost (distance to ending node) */

function cal_cost(coor,start_node){
    
    const row_coor  = coor[0];
    const column_coor = coor[1];

    const row_start_coor = start_node[0];
    const column_start_coor = start_node[1];

    const cost_row = (row_coor - row_start_coor);  
    const cost_column = (column_coor - column_start_coor);

    if(Math.sign(cost_row) === -1 && Math.sign(cost_column) === -1){
        return (-1)*cost_row + (-1)*cost_column ;
    }else if(Math.sign(cost_row) === 1 && Math.sign(cost_column) === -1){
        return cost_row + (-1)*cost_column ;
    }else if(Math.sign(cost_row) === -1 && Math.sign(cost_column) === 1){
        return (-1)*cost_row + cost_column ;
    }else if(Math.sign(cost_row) === 0 && Math.sign(cost_column) === -1){
        return cost_row + (-1)*cost_column ;
    }else if(Math.sign(cost_row) === -1 && Math.sign(cost_column) === 0){
        return (-1)*cost_row + cost_column ;
    }else {
        return cost_row + cost_column ;
    };
};

/* Function to get the next best node to check */
function best_next_node(f_close_node, close_node_x){ 

    const value_min = Math.min.apply(Math, f_close_node);

    var min_f_indexes = [];
    
    f_close_node.forEach(function (score, idx) {
        if (score == value_min) {
            min_f_indexes.push(idx);
        }
    });

    if(min_f_indexes.length === 1){

        return close_node_x[min_f_indexes[0]].slice(3,5);

    }else{

        var compare_h = [];

        min_f_indexes.forEach(function(x){
            compare_h.push(close_node_x[x][1]);
        })

        const min_h = Math.min.apply(Math,compare_h);
        /*
        console.log(compare_h)
        console.log(compare_h.indexOf(min_h))
        console.log(min_f_indexes[compare_h.indexOf(min_h)])
        console.log(close_node_x[min_f_indexes[compare_h.indexOf(min_h)]]);
        */
        return close_node_x[min_f_indexes[compare_h.indexOf(min_h)]].slice(3,5) ;

    }
};