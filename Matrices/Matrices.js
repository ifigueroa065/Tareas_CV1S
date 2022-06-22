class Node_Dispersa {
    constructor(x,y,value) {
        //punteros
        this.up = null
        this.down = null
        this.next = null
        this.prev = null

        //el objeto xd
        this.x=x
        this.y=y
        this.value=value
        
    }
    
        
}


class HeaderNode {
    constructor(pos) {
        this.next = null;
        this.prev = null;
        this.access = null;
        this.pos = pos;
    }
}

class Header{
    constructor(){
        this.head=null
    }
 
    isVoid(){
        return this.head == null;
    }
    getHeader(pos){
        var aux = this.head;
        while (aux != null) {
            if (aux.pos == pos){
                return aux;
            }
            aux = aux.next;
        }
        return null;
    }
    
    setHeader(newNode){
        if (this.isVoid()){
            this.head = newNode;
        } else if (newNode.pos < this.head.pos){
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        } else {
            var aux = this.head;
            while (aux.next != null) {
                if (newNode.pos < aux.next.pos){
                    newNode.next = aux.next;
                    aux.next.prev = newNode;
                    newNode.prev = aux;
                    aux.next = newNode;
                    break;
                }
                aux = aux.next;
            }
            
            if (aux.next == null){
                aux.next = newNode;
                newNode.prev = aux;
            }
        }
    }
}

class M_Dispersa{
    constructor(id,name){
        this.id=id;
        this.name=name 
        this.columna = new Header();
        this.fila = new Header(); 
    }
    printCols(){
        console.log("Imprimir por columnas");
        var auxc = this.columna.head;
        while (auxc != null) {
            console.log("Columna: " + auxc.pos + " -> ");
            var aux = auxc.access;
            while (aux != null){
                console.log("X: " + aux.x + " Y: "+ aux.y + ". ");
                aux = aux.down;
            }
            auxc = auxc.next;
            console.log();
        }
    }
    
    printRows(){
        console.log("Imprimir por filas");
        var auxr = this.fila.head;
        while (auxr != null) {
            console.log("Fila: " + auxr.pos + " -> ");
            var aux = auxr.access;
            while (aux != null){
                console.log("X: " + aux.x + " Y: "+ aux.y + ". ");
                aux = aux.next;
            }
            auxr = auxr.next;
            console.log();
        }
    }

   
    insert(x,y,value){
        var newCell = new Node_Dispersa(x,y,value);
        
        var check = this.returnIfExists(x, y);
        if (check != null){
            check.libro = color;
            return;
        }
        
        var nodoCol = this.columna.getHeader(x);
        if (nodoCol == null){
            nodoCol = new HeaderNode(x);
            this.columna.setHeader(nodoCol);
            nodoCol.access = newCell;
        } else if (y < nodoCol.access.y) {
            newCell.down = nodoCol.access;
            nodoCol.access.up = newCell;
            nodoCol.access = newCell;
        } else {
            var aux = nodoCol.access;
            while (aux.down != null){
                if (y < aux.down.y){
                    newCell.down = aux.down;
                    aux.down.up = newCell;
                    aux.down = newCell;
                    newCell.up = aux;
                    break;
                }
                aux = aux.down;
            }

            if (aux.down == null){
                aux.down = newCell;
                newCell.up = aux;
            }
        }
        

        var nodoFil = this.fila.getHeader(y);
        if (nodoFil == null){
            nodoFil = new HeaderNode(y);
            this.fila.setHeader(nodoFil);
            nodoFil.access = newCell;
        } else if (x < nodoFil.access.x){
            newCell.next = nodoFil.access;
            nodoFil.access.prev = newCell;
            nodoFil.access = newCell;
        } else {
            var aux = nodoFil.access;
            while (aux.next != null) {
                if (x < aux.next.x) {
                    newCell.next = aux.next;
                    aux.next.prev = newCell;
                    aux.next = newCell;
                    newCell.prev = aux;
                    break;
                }
                aux = aux.next;
            }

            if (aux.next == null){
                aux.next = newCell;
                newCell.up = aux;
            }
        }
    }

    returnIfExists(x, y){
        var headRow = this.fila.getHeader(y);
        if (headRow == null)
            return null;
        var headCol = this.columna.getHeader(x);
        if (headCol == null)
            return null;
        
        var aux = headRow.access;
        while (aux != null){
            if (aux.x == x)
                return aux;
            
            aux = aux.next;
        }
        
        return null;
    }

    insertMatriz(m){
        var auxc = m.columna.head;
        while (auxc != null){
            var aux = auxc.access;
            while (aux != null){
                this.insert(aux.x, aux.y, aux.libro);
                aux = aux.down;
            }
            auxc = auxc.next;
        }
    }

    graph_matrix(){
        var codigodot  = "digraph G{\n"
        codigodot+="node[ style=filled ,color=\"#819BE1\", shape=box];\n"
        codigodot+="label = \""+"MATRIZ DISPERSA"+"\";\n"
        
        codigodot+="edge[dir = \"both\"];\n";
        codigodot += "\n"
        
        //creando nodos columna
        
        var auxc = this.columna.head;
        codigodot+= "Root -> m"+auxc.pos+";\n"
        codigodot += "\n"
        codigodot += "//creando encabezados columna\n"
        codigodot += "\n"
        while (auxc != null){
            codigodot+="m"+auxc.pos+"[label = \""+auxc.pos+"\",group ="+(auxc.pos + 1)+", color=\"#81E1D7\" ];\n"
            if (auxc.next != null){
                codigodot+="m"+auxc.pos+" -> m"+auxc.next.pos+";\n"
                
            }
            
            auxc = auxc.next;
        }
        
        auxc = this.columna.head;
        codigodot += "\n"
        codigodot+="{ rank = same; Root;"

        while (auxc != null){
            codigodot+="m"+auxc.pos+";"
           
            auxc = auxc.next;
        }
        codigodot+="}\n"
        
        //creando nodos filas
        var auxr = this.fila.head;
        codigodot+="Root -> n"+auxr.pos+";\n"
        codigodot += "\n"
        codigodot += "//creando encabezados fila\n"
        while (auxr != null){
            
            codigodot+="n"+auxr.pos+"[label = \""+auxr.pos+"\",group = 1, color=\"#81E1D7\" ];\n"
          
            if (auxr.next != null){
                codigodot+="n"+auxr.pos+" -> n"+auxr.next.pos+";\n"
                
            }
            auxr = auxr.next;
        }
        
        //noditos
        var auxc = this.columna.head;
        codigodot += "\n"
        codigodot += "//creando nodos \n"
        while (auxc != null){
            var aux = auxc.access;
            while (aux != null){
                codigodot+="M"+aux.x+"N"+aux.y+"[label = \""+aux.value+"\", group = "+(aux.x + 1)+"];\n"
                aux = aux.down;
            }
            auxc = auxc.next;
        }
        
        //conectando columnas
        
        var auxc = this.columna.head;
        codigodot += "\n"
        codigodot += "//creando conexiones\n"
        while (auxc != null){
            if (auxc.access != null){
                codigodot+="m"+auxc.pos+" -> "+"M"+auxc.access.x+"N"+auxc.access.y+";\n"
            }
               
            var aux = auxc.access;
            while (aux != null){
                if (aux.down != null){
                    codigodot+="M"+aux.x+"N"+aux.y+" -> "+"M"+aux.down.x+"N"+aux.down.y+";\n"
                }
                   
                aux = aux.down;
            }
            
            auxc = auxc.next;
        }
        
        //conectando filas

        
        var auxr = this.fila.head;
        
        while (auxr != null){
            if (auxr.access != null){
                codigodot+="n"+auxr.pos+" -> "+"M"+auxr.access.x+"N"+auxr.access.y+";\n"
            }
            
            var aux = auxr.access;
            while (aux != null){
                if (aux.next != null){
                    codigodot+="M"+aux.x+"N"+aux.y+" -> "+"M"+aux.next.x+"N"+aux.next.y+";\n"
                }
                aux = aux.next;
            }
            
            auxr = auxr.next;
        }

        //haciendo la magia :)
        
        var auxr = this.fila.head;
        codigodot += "\n"

        while (auxr != null){
            codigodot+="{ rank = same; n"+auxr.pos+";"
            var aux = auxr.access;

            while (aux != null){
                codigodot+="M"+aux.x+"N"+aux.y+";"
                aux = aux.next;
            }
            codigodot+="}\n"
            auxr = auxr.next;
        }
        codigodot+="\n}"
        console.log(codigodot)
         
        d3.select("#lienzo_dis").graphviz()
            .width(800)
            .height(800)
            .renderDot(codigodot)

            

    }

}

class Nodo_Ortogonal{
    constructor(x,y,value){
        //el objeto xd
        this.x=x
        this.y=y
        this.value=value
        
        
        
        //apuntadores
        this.top=null;
        this.bot=null;
        this.left=null;
        this.right=null
    }
    
}

class L_Ortogonal {
    
    constructor(){
        this.cabeza=null
        this.cont=0
        this.m = 8
        this.n = 8
        var auxiliar = null
        var auxiliar2 = null
        for (var i = 1; i < this.n + 1; i++) {
            for (var j = 1; j < this.m + 1; j++) {
                var nuevo = new Nodo_Ortogonal(i,j,"","","","","","")
                nuevo.right = null
                nuevo.bot = null
                if (j == 1) {
                    nuevo.left = null
                    if (this.cabeza == null) {
                        this.cabeza = nuevo
                    }
                    auxiliar = nuevo
                } else {
                    nuevo.left = auxiliar
                    auxiliar.right = nuevo
                }
                if (i == 1) {
                    nuevo.top = null
                    auxiliar = nuevo
                } else {
                    nuevo.top = auxiliar2
                    auxiliar2.bot = nuevo
                    auxiliar2 = auxiliar2.right
                    auxiliar = nuevo
                }
            }
            auxiliar2 = this.cabeza
            while (auxiliar2.bot != null) {
                auxiliar2 = auxiliar2.bot
            }
        }
    }

    estaVacia(){
        return this.cabeza==null
    }

    add(pix,fila){
        if (this.estaVacia()) {
            var  tempNodo= new Nodo_Ortogonal(pix)
            this.cabeza=tempNodo
            this.cont++
        } else {
            var aux= this.cabeza

            //recorrido vertical
            while (aux.bot!=null) {
                aux=aux.bot
            }

            if (this.cont!=fila) {
                this.cont++
                var tempNodo= new Nodo_Ortogonal(pix)

                //creando una nueva fila
                aux.bot=tempNodo    //apunta bot
                tempNodo.top=aux    //apunta arriba
            } else {
                //recorrido horizontal
                while (aux.right!=null) {
                    aux=aux.right
                }
            

                //agregando nodo en una fila    
                var tempNodo= new Nodo_Ortogonal(pix)
                aux.right=tempNodo
                tempNodo.left=aux

                //si el nodo es de una fila <> a la principal
                if (this.cont>1) {
                    //se crea 2do nodo auxiliar
                    var aux2=aux.top.right
                    aux2.bot=tempNodo
                    tempNodo.top=aux2
                }
                
            }
        }
    }

    agregarnodo(x,y,value) {
        var temporal = this.cabeza
        while (temporal != null) {
            var toreto = temporal
            while (toreto != null) {
                if (toreto.x == x && toreto.y == y) {
                    toreto.value = value
                  
                }
                toreto = toreto.right
            }
            temporal = temporal.bot
        }
    }

    Mostrar() {
        if (this.cabeza != null) {
            var temporal = this.cabeza
            while (temporal != null) {
                var toreto = temporal
                var img = ""
                while (toreto != null) {
                    img = img + " " + toreto.value
                    toreto = toreto.right
                }
                temporal = temporal.bot
                console.log(img)
            }
        } else {
            console.log("no hay datos ")
        }
    }


    mostrarLista(){
        var contcol=1
        var contfila=1
        var aux = this.cabeza
        var img = ""
        while (aux.bot!=null || aux.right!=null) {
            img+=aux.pix
            if (aux.right!=null) {
                aux=aux.right
                contcol++
            } else {
                contfila++
                contcol=1
                //imprimo la fila que leí
                console.log(img)
                if (aux.bot!=null) {
                    img=""
                    aux=aux.bot
                    while (aux.left!=null) {
                        aux=aux.left
                    }
                }
            }
        }
        img+=aux.pix
        console.log(img)

    }
    

    graficar() {
        if (this.cabeza != null) {
            var codigodot  = "digraph G{\n"
            codigodot+="node[ style=filled ,color=\"#819BE1\", shape=box];\n"
            codigodot+="label = \""+"MATRIZ ORTOGONAL"+"\";\n"
            var nodos = ""
            var conexiones = ""
            var rank = ""
            var num = 1
            var i = 0;
           
                ///** */
            var temporal = this.cabeza
            while (temporal != null) {
                var toreto = temporal
                
                while (toreto != null) {
                    codigodot += "\n"
                    codigodot += "Nodo" + num + "[label=\"" + toreto.value + "\"];"
                    //apuntador bot
                    if (toreto.bot != null) {
                        
                        conexiones += "Nodo" + num + " -> Nodo" + (num + this.m) + "[ dir = both ];\n"
                    }
                    //apuntador derecha
                    if (toreto.right != null) {
                        
                        conexiones += "Nodo" + num + " -> Nodo" + (num + 1) + "[ dir = both ];\n"
                    }
                    if (i == 0) {
                        var bryan = temporal;
                        var auxiliar2 = " ";
                        var auxnum = num;
                        while (bryan != null) {
                            auxiliar2 += "Nodo" + auxnum + ";"
                            bryan = bryan.right
                            auxnum++;
                        }
                        codigodot += "\n"
                        codigodot += "{rank=same " + auxiliar2 + "};\n"
                    }
                    
                    num++;
                    toreto = toreto.right
                    i++;
                }
                i = 0;
                temporal = temporal.bot
                
            }
            codigodot += "\n"
            codigodot += "//relacionando nodos\n"

            codigodot += conexiones;
            codigodot += "\n}";
            console.log(codigodot)
            
            d3.select("#lienzo_orto").graphviz()
                .width(800)
                .height(800)
                .renderDot(codigodot)


        } else {
            console.log("no hay datos ")
        }
    }

}


var matrizAux = new M_Dispersa()

matrizAux.insert(1,1,"M")
matrizAux.insert(2,2,"A")
matrizAux.insert(3,3,"R")
matrizAux.insert(4,4,"L")
matrizAux.insert(5,5,"O")
matrizAux.insert(6,6,"N")

console.log("_________________ imprimiendo ___________")
matrizAux.printCols()
matrizAux.graph_matrix()

var prueba= new L_Ortogonal()


 
prueba.agregarnodo(1, 1, "F")
prueba.agregarnodo(2, 2, "I")
prueba.agregarnodo(3, 3, "G")
prueba.agregarnodo(4, 4, "U")
prueba.agregarnodo(5, 5, "E")
prueba.agregarnodo(6, 6, "R")
prueba.agregarnodo(7, 7, "O")
prueba.agregarnodo(8, 8, "A")

prueba.Mostrar()
prueba.graficar()
