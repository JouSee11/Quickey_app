const arrowsUp = document.querySelectorAll('.node-button-up');
const arrowsDown = document.querySelectorAll('.node-button-down');

console.log(arrowsUp);


// Add event listeners to each up arrow
arrowsUp.forEach(arrow => {
    arrow.addEventListener('click', function(event) {
        console.log('up arrow clicked');
        const node = this.closest('.action-node');
        const prevNode = node.previousElementSibling;
        
        if (prevNode && prevNode.classList.contains('action-node')) {
            node.parentNode.insertBefore(node, prevNode);
        }
    });
});

// Add event listeners to each down arrow
arrowsDown.forEach(arrow => {
    arrow.addEventListener('click', function(event) {
        console.log('down arrow clicked');
        const node = this.closest('.action-node');
        const nextNode = node.nextElementSibling;
        
        if (nextNode && nextNode.classList.contains('action-node')) {
            node.parentNode.insertBefore(nextNode, node);
        }
    });
});