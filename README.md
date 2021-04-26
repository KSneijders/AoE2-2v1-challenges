# AoE2-2v1-challenges

## What is this?

This is a simple (everything but professional) `Age Of Empires II Definitive Edition` web app for playing fun 2v1 challenges.

## Why?

This was created based on an idea 2 friends and I came up with. 
To play 2v1 games and try and make them fair in a fun way. 
So we came up with a list of challenges and assigned cost to each of them.
It's basically our own strat-roulette which we can change and balance to our hearts content.

## Branches

In the `master` branch is a version where the solo player can pick the challenges.
The challenges will then apply to both the duo players. 

On the `random` branch is a version where everyone involved clicks a button.
You set up the points of the current solo player and click if you are solo or duo.
The duo players get a set of random challenges, and the solo player random commands.

## How does it work

There are six categories. 

- Economy
- Military
- Buildings
- Technologies
- Miscellaneous
- Commands

You get a certain amount of points (we defaulted to 20 at the start).
With those 20 you generate a random distribution to the first four categories
(`Economy`, `Military`, `Buildings`, `Technologies`). 
They each get a random amount of 'fixed' points you can't spend in any of the other three.
The total of the four random amounts will be close to ~60% of the total points (~12/20 at first)
Selecting challenges will cost you some points. The left over ~40% (~8/20 at first) of the points are 'wild-points'.
They can be spent on any category. 

The categories `Miscellaneous` and `Commands` are a little different. You can spend any point there.
So even points from `Economy` can be used for challenges in those categories.

### Master branch version

The solo player is the player choosing the strategies. 
Chosen strategies apply to both the duo players and can be copy-pasted into discord. 
Commands are hidden by the double pipes `||Command line here||`. 
Make sure all players have those enabled in discord. 
(`Settings` > `Text & Images` > `Show spoiler content` (at the bottom) > `On Click`)

If they win, next game they solo, they have n-1 point. 
So if they won their first (20 point) game, their second solo game will have 19 points. 
Same goes for losing, their second game will have 21 points.
This is to equalize the small skill difference if it exists.

### Random branch version

The `random` branch version is, like the name says, random. No challenges can be chosen.
There is still a point system which will go up and down with each win or loss like the `master` branch version.
On this branch the default points are a bit higher, this is due to the fact the strats are more random.
It's also important that the solo player doesn't know the duo players their strats. 
Same goes for the duo players not knowing the solo player's commands.

The solo player gets random commands assigned. The duo players each their own random challenges.

## Disclaimer

This was made for fun in the evening hours. There are probably bugs and code is sometimes written in a (very) hacky way.
