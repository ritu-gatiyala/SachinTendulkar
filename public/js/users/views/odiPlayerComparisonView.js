define([
	'jquery',
	'underscore',
	'backbone',
	'highcharts',
	'users/collections/odiPlayerComparisonCollection'
	],function($,_,Backbone,highcharts,odiPlayerComparisonCollection){
		var odiPlayerComparisonView= Backbone.View.extend({
			el: '#graph1',
			initialize: function(){
				var self= this;
				this.OdiPlayerComparisonCollection= new odiPlayerComparisonCollection();
				this.OdiPlayerComparisonCollection.fetch({
					success: function(){
						self.render();
					}
				})
			},
			render: function(){
				var self=this;
				this.$el.highcharts({
					chart:{
						type: 'column'
					},
					title: {
						text: 'Who is better?'
					},
					xAxis: {
						categories: self.OdiPlayerComparisonCollection.toJSON().map(function(x){return [x['player_name']]})
					},
          series: [{
          	name: 'Average',
            data: self.OdiPlayerComparisonCollection.toJSON().map(function(x){return [x['average']]})
          },{
          	name: 'Strike rate',
          	data: self.OdiPlayerComparisonCollection.toJSON().map(function(x){return [x['strike_rate']]})
          },{
          	name: 'Wickets',
          	data: self.OdiPlayerComparisonCollection.toJSON().map(function(x){return [x['wickets']]})
          },{
          	name: 'Highest Score',
          	data: self.OdiPlayerComparisonCollection.toJSON().map(function(x){return [x['highest_score']]})
          }]
				});
			}
		});
		return odiPlayerComparisonView;
});