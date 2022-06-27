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
    // get one Thought by id
    getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      }); 
    },

      createThought({ body }, res) {
        Thought.create(body)
        return User.findOneAndUpdate(
            { _id: params.userId},
            {$push: {thoughts: _id}},
            {new: true, runValidators: true})
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },

      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtid }, body, { new: true })
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
        Thought.findOneAndDelete({ _id: params.thoughtid })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => res.json(err));
      },
    

     addReaction({params, body}, res) {
        Thought.findOneAndUpdate( 
            { _id: params.thoughtId},
            { $push: {reactions: body}},
            { new: true, runValidators: true}
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
        
    // DELETE to pull and remove a reaction by the reaction's reactionId value
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