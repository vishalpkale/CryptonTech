const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function repeat(){
rl.question('Enter your arithmetic question: ', (question) => {
    const operation = question.includes('plus') ? 'plus' :
    question.includes('minus') ? 'minus' :
    question.includes('multiplied by') ? 'multiplied by' :
    question.includes('divided by') ? 'divided by' : '';


if (operation) {
    let leftOperand = "";
   let rightOperand = "";
   let nums=['0','1','2','3','4','5','6','7','8','9']
    for(let i=0;i<question.length;i++){
       if(!leftOperand){while(nums.includes(question[i])){
        leftOperand=leftOperand+question[i]
        i++
       }}
      else{ while(nums.includes(question[i])){
        rightOperand=rightOperand+question[i]
        i++
       }}
    
    }
    leftOperand = parseInt(leftOperand);
 rightOperand = parseInt(rightOperand);
    


  
  let result;
  switch (operation) {
    case 'plus': 
      result = leftOperand + rightOperand;
      break;
    case 'minus':
      result = leftOperand - rightOperand;
      break;
    case 'multiplied by':
      result = leftOperand * rightOperand;
      break;
    case 'divided by':
      result = leftOperand / rightOperand;
      break;
  }
  
  console.log(`${leftOperand} ${operation} ${rightOperand} is ${result}`);}
 else{ console.log('I guess there is a spelling mistake , you can choose one of these word to perform operaion, that are, plus | minus | multiplied by | divided by ')
  }
  function forCountineu(){
  rl.question('For continue press "c" ,for exit press "e" :- ',(ans)=>{
    if(ans=="e"){
        rl.close()
    }
    else if(ans=="c"){
        repeat()
    }
    else{
        console.log('Choose one of them, i.e. either "e" or "c" ')
        forCountineu()
    }

  })
}

forCountineu()
});


}
repeat()