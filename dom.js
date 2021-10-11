window.dom = {
  create(string) {
    const container = document.createElement("template")
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  append(parent, child) {
    parent.appendChild(child)
  },
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  empty(node) {
    const array = []
    let tem = node.firstChild
    while (tem) {
      array.push(tem)
      node.parentNode.removeChild(tem)
    }
    return array
  },
  attr(node, name, value) {
    if (value !== undefined) {
      return node.getAttribute(name)
    } else {
      node.setAttribute(name, value)
    }
  },
  text(node, value){
    if(value !== undefined){
        node.textContent(value)
    }else{
        return node.textContent
    }
  },
  html(node, value) {
      if(value !== undefined){
          node.innerHTML(value)
      }else{
          return node.innerHTML
      }
  },
  style(node, obj) {
      if(obj !== undefined){
          let keys = Object.keys(obj)
          let values = Object.values(obj)
          for(let i = 0; i < keys.length; i++){
            node.style[keys[i]] = values[i]
          }
      }else{
          return node.getAttribute(style)
      }
  },
  class: {
    remove(node, value) {
      node.classList.remove(value)
    },
    add(node, value){
      node.classList.add(value)
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn)
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn)
  },
  find(selectorValue, scape) {
    return (document || scape).querySelectorAll(selectorValue)
  },
  parent(node) {
    return node.parentNode
  },
  children(node) {
    return node.childNodes
  },
  siblings(node) {
    let array = []
    let tem = node.parentNode.childNodes
    for(let i = 0; i < tem.length; i++){
      if(tem[i] !== node && tem[i].nodeType !== 3){
        array.push(tem[i])
      }else{
        ;
      }
    }
    return array
  },
  next(node) {
    let tem = node.nextSibling
    while(tem.nodeType === 3){
      if(tem.nextSibling === null){
        return null
      }
      tem = tem.nextSibling
    }
    return tem
  },
  previous(node) {
    let tem = node.previousSibling
    while(tem.nodeType === 3){
      if(tem.previousSibling === null){
        return null
      }
      tem = tem.previousSibling
    }
    return tem
  },
  each(nodes, fn) {
    for(let i = 0; i < nodes.length; i++){
      fn.call(null, nodeList[i])
    }
    
  },
  index(node) {
    let index = 0;
    tem = node.previousSibling
    while(1){
      if(tem === null){
        break
      }else if(tem.nodeType !== 3){
        index++
      }
      tem = tem.previousSibling
      
    }
    return index
  },
  delegate(agent, eventType, clientSelector, fn){
      agent.addEventListener(eventType, (e)=>{
            let el = e.target;
            while(!el.matches(clientSelector)){
                  if(el === agent){
                        el === null;
                        break;
                  }
                  el = el.parentNode;     
            }
            el && fn.call(el, e, el);
      })
      return agent;
  }
}
