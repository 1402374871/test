function ListNode(val) {
  this.val = val;
  this.next = null;
}

function createList(nodesValue){
  while(nodesValue>=10){
    var l=0;
			while(nodesValue >= 1){
        let node1=ListNode(nodesValue%10);
        let p =
        node1.next=
        nodesValue=nodesValue/10;
			  l++;
			}
			console.log(l);
  }
}
