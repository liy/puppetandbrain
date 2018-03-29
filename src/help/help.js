export default {
  Action: {
    e: [{
      n: "default",
      d: "Execute connected block"
    }],
    i: [],
    o: [],
    d: "You can also add custom outputs by click the + pin. Connect this block to other blocks to create a custom action. A Perform block will then be presented in the block browser. You can then connect the Perform block to trigger this custom action."
  },

  Animation: {
    e: [{
      n: "default",
      d: "Execute connected block"
    }],
    i: [{
      n: "name",
      t: "text",
      d: "Specify an animation for the puppet"
    }],
    o: [],
    d: "This block only show up in puppet with animations. You can pick an animation to play an animation of the puppet."
  },

  Flip: {
    e: [{
      n: "default",
      d: "Immeditately execute connected block"
    }, {
      n: "completed",
      d: "Execute connected block until flip animation completes"
    }],
    i: [{
      n: "direction",
      t: "text",
      d: "Flip to the specified direction"
    }, {
      n: "duration",
      t: "double",
      d: "The time duration of the flip animation, in seconds."
    }],
    o: [],
    d: "Flip a puppet to a specified direction. One thing you can do is have two Flip blocks with different directions, and connect the second Flip's completed pin back to the left enter pin of the first block. Then the puppet will keep flipping back and forth forever."
  },

  Jump: {
    e: [{
      n: "default",
      d: "Immeditately execute connected block"
    }, {
      n: "completed",
      d: "Execute connected block until jump animation completes"
    }],
    i: [{
      n: "height",
      t: "double",
      d: "Jump height, in pixels"
    }, {
      n: "duration",
      t: "double",
      d: "The time duration of the jump animation, in seconds."
    }],
    o: [],
    d: "Make a puppet jump. You can connect the completed pin back to the enter pin to make puppet jumping forever."
  },

  Move: {
    e: [{
      n: "default",
      d: "Immeditately execute connected block"
    }, {
      n: "completed",
      d: "Execute connected block until move animation completes"
    }],
    i: [{
      n: "step",
      t: "vector",
      d: "Step relative to current puppet position in both x and y directins, in pixels"
    }, {
      n: "duration",
      t: "double",
      d: "The time duration of the move animation, in seconds."
    }],
    o: [],
    d: "Make a puppet move relative to current puppet position. You can connect the completed pin back to the enter pin to make puppet moving forever."
  },

  Loop: {
    e: [{
      n: "loop",
      d: "loop execute the connected block. Note that, you have to connect the child blocks back to the left enter pin to complete the loop."
    }, {
      n: "exit",
      d: "when condition input is false, which means exiting the loop and execute connected block. Do not connect this pin back to the left enter pin, otherwise it is a infinite loop."
    }],
    i: [{
      n: "condition",
      t: "boolean",
      d: "Specify whether to keep looping. Can be only either true or false."
    }],
    o: [{
      n: "count",
      d: "Count how many times has been loopped, i.e., you can connect this output to other blocks in the loop to get the loop count."
    }],
    d: "Keep executing loop pin connected blocks until condition become false, and then execute the exit connected blocks."
  }
}