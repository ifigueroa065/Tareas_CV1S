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
            d3.select("#lienzo_fantasia1").graphviz()
                .width(1200)
                .height(800)
                .renderDot(codigodot)


        } else {
            console.log("no hay datos ")
        }
    }

}



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