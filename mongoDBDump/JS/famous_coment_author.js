use blog

db.posts.aggregate([
	{$unwind:"$comments"},
	{$project:
	 {
	  _id:0,
	  author_com:"$comments.author",
	  email:"$comments.email"	
	 }
	},
	{$group:
	 {
	  _id:{
		name:"$author_com"
	      },
	  number_com:{$sum:1}
	 }		
	},	
	/*{$sort:
	 { number_com:-1 }	
	},
	{$limit:1}*/

	{$group:
	 {_id:null,
	  author:"$_id",
	  comments:{$max:"$number_com"}	
	}
]);
