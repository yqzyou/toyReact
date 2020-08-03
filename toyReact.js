class Elementwrapper {
    constructor(type){
        this.root = document.createElement(type)
    }
    setAttribute(name, value){
        this.root.setAttribute(name, value)
    }
    appendChild(vchild){
        vchild.mountTo(this.root)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}

class Textwrapper {
    constructor(content){
        this.root = document.createTextNode(content)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}

export class Component {
    constructor(){
        this.children = [];
    }
    setAttribute(name, value){
        this[name] = value;
    }
    mountTo(parent){
        let vdom =this.render()
        vdom.mountTo(parent);
    }
    appendChild(vchild){
        this.children.push(vchild)
    }
}

export let ToyReact = {
    createElement(type, attributes, ...children){
        let element;
        if(typeof type === 'string') {
            element = new Elementwrapper(type)
        }else {
            element = new type
        }
        for(let name in attributes) {
            element.setAttribute(name, attributes[name]);
        }
        let insertChildren = (children) => {
            for(let child of children){
                if(typeof child === 'string'){
                    child = new Textwrapper(child);
                }
                if(typeof child === 'object' && child instanceof Array) {
                    insertChildren(child)
                }else {
                    element.appendChild(child);
                }
            }
        }
        insertChildren(children);
        
        return element;
    },
    render(vdom, element) {
        vdom.mountTo(element)
    }
}