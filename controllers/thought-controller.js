const { Thought } = require('../models');

const thoughtController = {

    getAllThought(req,res){
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    // get single thought by ID
    getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      }); 
    },

      createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id}) => {
            console.log(_id)
            return User.findOneAndUpdate(
                { _id: params.userId},
                {$push: {thoughts: _id}},
                {new: true, runValidators: true}
            )
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No user found with this id"})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },
//update thought
      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
    
      // delete Thought
      deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },
    

     addReaction({params, body}, res) {
        Thought.findOneAndUpdate( 
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json(err);
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err))
    },
        
    // DELETE reaction
    removeReaction({params}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: {reactionId: params.reactionId}}},
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err))
    }
};

    module.exports = thoughtController;