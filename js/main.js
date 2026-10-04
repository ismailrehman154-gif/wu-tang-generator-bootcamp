document.querySelector("#gen").addEventListener("click", wuTangGen)

function wuTangGen() {
    const questions = ['q1','q2','q3','q4','q5'];
    const answers = questions.map(function(question){
        const picked = document.querySelector('input[name = "' + question + '"]:checked'); // instead of using the index we use the name and it will only grab the checked input(vecuase we are using input radio buttons)

        return picked ? picked.value : '' // the spots stays empty for an unchecked question and does not give us false information
    })
    if(answers.includes('')) {
        document.getElementById("result").textContent = "Please answer all questions.";
        return; // stop further execution if not all questions are answered
    }
    const query = questions.map(function(question,index){
        return question + '=' + answers[index];
    })
    .join('&'); // join the query parameters with '&' to create a query string

    fetch('/api?' + query)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        document.getElementById("result").textContent = 'Your Name is ' + data.name;
    });
}