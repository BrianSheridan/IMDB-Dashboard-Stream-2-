queue()
   .defer(d3.json, "/data")
   .await(makeGraphs);
 
function makeGraphs(error, movieJSON) {
  
   //Create a Crossfilter instance
   var ndx = crossfilter(movieJSON);

   

 
   //Define Dimensions
    var genresDim = ndx.dimension(function (d) {
        return d["genres"];
    });

    var genresPieDim = ndx.dimension(function (d) {
        return d["genres"];
    });

    var genreBarDim = ndx.dimension(function (d){
        return d["genres"];
    });

    var budgetBarDim = ndx.dimension(function (d){
        return d["genres"];
    });

    var grossBarDim = ndx.dimension(function (d){
        return d["genres"];
    });

    var countDim = ndx.dimension(function (d){
        return d["genres"];
    });



    var ratingPieDim = ndx.dimension(function (d) {
        return d["content_rating"];
    });

    var budgetPieDim = ndx.dimension(function (d) {
        return d["budget"];
    });

    var yearDim = ndx.dimension(function (d) {
        return d["title_year"];
    });

    var profitLossDim = ndx.dimension(function (d) {
        if (+d['budget'] > +d['gross'])
            return 'Loss';
        else
            return 'Profit';
    });

    var profitLossGroup = profitLossDim.group();

    


    //Calculate metrics
    var numMoviesByGenres = genresDim.group();
    var pieMoviesByGenres = genresPieDim.group();
    var numMoviesByContentRating = ratingPieDim.group();
    var numberMoviesByBudget = budgetPieDim.group();




    //Total budget for each Genre
    var totalBudgetByGenre = genreBarDim.group().reduceSum(function (d){
        return +d['budget'];
    });  

   var averageGrossByGenre = genreBarDim.group().reduce(
        function (p, v) {
            ++p.count;
            p.total += v.budget;
            p.average = p.total / p.count;
            return p;
        },
        function (p, v) {
            --p.count;
            if(p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.budget;
                p.average = p.total / p.count;
            };
            return p;
        },
        function () {
            return {count: 0, total: 0, average: 0};
        }
    );


   var averageImdbByYear = yearDim.group().reduce(
        function (p, v) {
            ++p.count;
            p.total += v.imdb_score;
            p.average = p.total / p.count;
            return p;
        },
        function (p, v) {
            --p.count;
            if(p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.imdb_score;
                p.average = p.total / p.count;
            };
            return p;
        },
        function () {
            return {count: 0, total: 0, average: 0};
        }
    );


   var averageBudgetByGenre = countDim.group().reduce(
        function (p, v) {
            ++p.count;
            p.total += v.budget;
            p.average = p.total / p.count;
            return p;
        },
        function (p, v) {
            --p.count;
            if(p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.budget;
                p.average = p.total / p.count;
            };
            return p;
        },
        function () {
            return {count: 0, total: 0, average: 0};
        }
    );

   var averageGrossByGenre = countDim.group().reduce(
        function (p, v) {
            ++p.count;
            p.total += v.gross;
            p.average = p.total / p.count;
            return p;
        },
        function (p, v) {
            --p.count;
            if(p.count == 0) {
                p.total = 0;
                p.average = 0;
            } else {
                p.total -= v.gross;
                p.average = p.total / p.count;
            };
            return p;
        },
        function () {
            return {count: 0, total: 0, average: 0};
        }
    );

    

        

    
    
    


      // composite chart
    var rd_budgetByYear = genresDim.group().reduceSum(function (d) {
        return +d.budget;
    });

    var rd_grossByYear = genresDim.group().reduceSum(function (d) {
        return +d.gross;
    });

    
 
   //Charts
   var genresbar = dc.barChart("#gen-count-chart");
   var genrePie = dc.pieChart("#gen-pie-chart")
   var ratePie = dc.pieChart("#rate-pie-chart")
   var budgetPie =dc.pieChart("#budget-pie-chart")
   var moviesByYearChart = dc.lineChart('#year-count-chart')
   var genreByBudgetChart = dc.lineChart('#genre-count-chart')
   var genreByGrossChart = dc.lineChart('#gross-count-chart')
   var compositeChart = dc.compositeChart('#composite-chart');
   var profitLossChart = dc.pieChart("#profitloss-pie-chart");


    genresbar
       .width(800)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(genresDim)
       .group(numMoviesByGenres)
       .transitionDuration(500)
       .x(d3.scale.ordinal())
       .xUnits(dc.units.ordinal)
       .elasticY(true)
       .xAxisLabel("genres") 
       .yAxis().ticks(4);


    compositeChart
        .width(990)
        .height(200)
        .elasticY(true)
        .dimension(genresDim)
        .group(rd_budgetByYear)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .yAxisLabel("The Y Axis")
        .legend(dc.legend().x(80).y(20).itemHeight(13).gap(5))
        .renderHorizontalGridLines(true)
        ._rangeBandPadding(1)
        .compose([
            dc.lineChart(compositeChart)
                .colors('green')
                .group(rd_budgetByYear, 'Budget'),
            dc.lineChart(compositeChart)
                .colors('red')
                .group(rd_grossByYear, 'Gross')
        ])
        .brushOn(false)
        .render();
    
    genrePie
       .height(320)
       .radius(150)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(genresPieDim)
       .group(pieMoviesByGenres);

    ratePie
       .height(320)
       .radius(150)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(ratingPieDim)
       .group(numMoviesByContentRating);

    budgetPie
      .height(320)
       .radius(150)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(profitLossDim)
       .group(profitLossGroup);

    moviesByYearChart
       .width(1000)
       .height(300)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(yearDim)
       .group(averageImdbByYear)
       .valueAccessor(function(d){
           return d.value.average;
       })
       .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
    //    .elasticY(true)
    //    .yAxis().ticks(4)
       .xAxisLabel("By Year average rating")
    //    .x(d3.time.scale().domain([1947,2017]))
       .xAxis().ticks(5);
    //    .xAxis().tickFormat(function(y){return y * 1});


    genreByBudgetChart
        .width(800)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(budgetBarDim)
        .group(averageBudgetByGenre)
        .valueAccessor(function(d){
            return d.value.average;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Average Budget per Genre") 
        .yAxis().ticks(4);

    genreByGrossChart
        .width(800)
        .height(300)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .dimension(grossBarDim)
        .group(averageGrossByGenre)
        .valueAccessor(function(d){
            return d.value.average;
        })
        .transitionDuration(500)
        .x(d3.scale.ordinal())
        .xUnits(dc.units.ordinal)
        .elasticY(true)
        .xAxisLabel("Average Gross per Genre") 
        .yAxis().ticks(4);

    profitLossChart
       .height(320)
       .radius(150)
       .innerRadius(40)
       .transitionDuration(1500)
       .dimension(profitLossDim)
       .group(profitLossGroup);

   dc.renderAll();
}