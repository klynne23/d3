var deaths = [
    // { title: "Snow White and the Seven Dwarfs", deaths: 1, year: 1937},
    // { title: "Fantasia", deaths: 4, year: 1940 },
    { title: "Pinocchio", deaths: 83, year: 1940 },
    { title: "Bambi", deaths: 81, year: 1942 },
    // { title: "Make Mine Music", deaths: 6, year: 1946 },
    { title: "Melody Time", deaths: 108, year: 1948 },
    // { title: "Alice in Wonderland", deaths: 16, year: 1951 },
    // { title: "Peter Pan", deaths: 2, year: 1953 },
    // { title: "Lady and the Tramp", deaths: 1, year: 1955 },
    // { title: "Sleeping Beauty", deaths: 2, year: 1959 },
    // { title: "The Rescuers", deaths: 1, year: 1977 },
    // { title: "The Black Cauldron", deaths: 2, year: 1985 },
    // { title: "The Great Mouse Detective", deaths: 4, year: 1986 },
    // { title: "Oliver and Company", deaths: 3, year: 1988 },
    // { title: "The Little Mermaid", deaths: 27, year: 1989 },
    // { title: "Beauty and the Beast", deaths: 1, year: 1991 },
    { title: "The Lion King", deaths: 1660, year: 1994 },
    // { title: "Pocahontas", deaths: 1, year: 1995 },
    // { title: "Hunchback of Notre Dame", deaths: 47, year: 1996 },
    // { title: "Hercules", deaths: 20000, year: 1997 },
    { title: "Mulan", deaths: 1468, year: 1998 },
    // { title: "Tarzan", deaths: 5, year: 1999 },
    // { title: "Fantasia 2000", deaths: 1, year: 2000 },
    // { title: "Dinosaur", deaths: 307143, year: 2000 },
    // { title: "Emperor's New Groove", deaths: 5, year: 2000 },
    // { title: "Atlantis", deaths: 35185, year: 2001 },
    { title: "Treasure Planet", deaths: 1017, year: 2002 },
    { title: "Brother Bear", deaths: 83, year: 2003 },
    { title: "Home on the Range", deaths: 304, year: 2004 },
    // { title: "Chicken Little", deaths: 17, year: 2005 },
    // { title: "The Princess and the Frog", deaths: 1, year: 2009 },
    // { title: "Tangled", deaths: 1, year: 2010 },
    // { title: "Wreck-it Ralph", deaths: 1, year: 2012 },
    // { title: "Frozen", deaths: 33, year: 2013 },
    // { title: "Big Hero 6", deaths: 2, year: 2014 },
    { title: "Moana", deaths: 261, year: 2016 }
  ];


  var counter = 0;
  var deathNum;
  var userScore = 0;
  
  
  /* FUNCTIONS FOR GAME LOGIC */
  
  function generateButtons() {
  
      $("#userScore").append(userScore);
      var currentCount = deathCounter(counter);
      $("#numDeaths").append(currentCount);
  
      // empty the div
      $("#filmButtons").empty();
      // console.log("function running");
      // creates the buttons based on the deaths array
      for (var i = 0; i < deaths.length; i++) {
          var btn = $("<button>");
          btn.text(deaths[i].title);
          btn.addClass("btn btn-dark filmTitleButton");
          btn.attr("data-title", deaths[i].title);
          btn.attr("status", "not clicked");
          $("#filmButtons").append(btn);
      } // end for loop
  
  }// end generateButtons function
  
  function deathCounter(counter) {
      const deaths = [81, 83, 83, 108, 261, 304, 1017, 1468, 1660]
      console.log("death counter: " + counter);
      return deaths[counter];
  
  } // end deathCounter function
  
  function buttonClicked() {
  
      console.log("CURRENT COUNTER: "+counter);
  
      var title = $(this).data("title");
      var status = $(this).attr("status");
  
      var currentNumDeaths = deathCounter(counter);
      var correct = checkAnswer(title);
  
      $("#numDeaths").empty();
      $("#numDeaths").append(currentNumDeaths);
  
  
      console.log("Correct # of Deaths: "+currentNumDeaths + "\n Selected Film Deaths: "+ correct);
  
  
      if (status == "not clicked") {
          if (currentNumDeaths == correct) {
              console.log("CORRECT!");
              userScore++;
              $("#userScore").text(userScore);
              counter++;
              if (counter ==9){
                  currentNumDeaths = "GAME OVER!";
                  $("#numDeaths").empty();
                  $("#numDeaths").text(currentNumDeaths);
              }
              else {
                  currentNumDeaths = deathCounter(counter);        
                  $("#numDeaths").empty();
                  $("#numDeaths").append(currentNumDeaths);
              }
              $(this).addClass("disabled");
              $(this).attr("status", "clicked");
          }
          else {
              console.log("INCORRECT!");
              userScore--;
              $("#userScore").text(userScore);
          }
      }
      else {
          return;
      }
  
  
  
  
  }  // end buttonClicked function
  
  
  function checkAnswer(title) {
      // create variables
      var death;
      deaths.forEach(element => {
          if (element.title == title){
              death = element.deaths;
          }
      })
      return death;
  } // end checkAnswer
  
  generateButtons();
  
  $(document).on("click", ".filmTitleButton", buttonClicked);