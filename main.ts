enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Gap = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gap, function (sprite, otherSprite) {
    if (otherSprite.right - sprite.left < 2) {
        info.changeScoreBy(1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    game.over(false)
})
controller.anyButton.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -100
    animation.setAction(mySprite, ActionKind.Jumping)
    mySprite.startEffect(effects.rings, 300)
})
let projectile: Sprite = null
let gapSprite: Sprite = null
let gapImage: Image = null
let bottomImage: Image = null
let topImage: Image = null
let gap = 0
let mySprite: Sprite = null
scene.setBackgroundColor(3)
info.setScore(0)
effects.blizzard.startScreenEffect()
mySprite = sprites.create(img`
. . . . . . . . . . 6 5 6 . . . 
. . . . . . . . . 6 5 6 . . . . 
. . . . . . . . . 6 8 . . . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. . . . 6 6 5 9 1 f 5 5 9 f . . 
. . . . 6 5 5 1 f f 5 9 2 8 . . 
. . . . 6 5 5 9 f 6 9 9 2 2 . . 
6 9 9 9 6 6 9 5 5 5 2 2 2 2 2 6 
6 6 9 5 5 5 6 5 5 2 2 2 2 2 6 . 
6 9 8 5 5 5 5 9 5 5 5 5 5 6 . . 
8 9 9 8 9 5 5 6 5 5 5 5 5 5 6 . 
8 6 9 9 8 8 6 5 5 5 5 5 5 5 6 . 
. 8 9 9 9 9 9 9 5 5 5 5 5 9 6 . 
. . 8 6 9 9 9 9 9 5 5 5 6 6 . . 
. . . 8 8 8 8 8 8 8 8 6 6 . . . 
`, SpriteKind.Player)
mySprite.ay = 300
let anim = animation.createAnimation(ActionKind.Jumping, 25)
anim.addAnimationFrame(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . 6 5 5 6 . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. 6 6 6 6 6 5 5 5 5 5 5 5 6 . . 
. 6 9 5 6 5 5 5 5 5 5 5 5 6 . . 
. . 6 5 5 6 5 9 1 f 5 9 2 f . . 
. . 6 9 5 5 6 1 f f 5 2 2 8 . . 
6 6 9 6 5 5 5 9 f 6 2 2 2 2 6 . 
6 9 9 8 9 5 5 6 5 2 2 2 2 2 2 6 
8 9 9 9 8 8 6 5 5 5 5 5 5 5 6 . 
8 6 9 9 9 9 9 5 5 5 5 5 5 5 6 . 
. 8 9 9 9 9 9 9 5 5 5 5 5 9 6 . 
. . 8 6 9 9 9 9 9 5 5 5 6 6 . . 
. . . 8 8 8 8 8 8 8 8 6 6 . . . 
`)
anim.addAnimationFrame(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . 6 5 6 . . . 
. . . . . . . . . 6 5 6 . . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. 6 6 6 6 6 5 5 5 5 5 5 5 6 . . 
. 6 9 5 6 5 5 5 5 5 5 5 5 6 . . 
. . 6 5 5 6 5 9 1 f 5 9 2 f . . 
. . 6 9 5 5 6 1 f f 5 2 2 8 . . 
6 6 9 6 5 5 5 9 f 6 2 2 2 2 2 6 
6 9 9 8 9 5 5 6 5 2 2 2 2 2 6 . 
8 9 9 9 8 8 6 5 5 5 5 5 5 5 6 . 
8 6 9 9 9 9 9 5 5 5 5 5 5 5 6 . 
. 8 9 9 9 9 9 9 5 5 5 5 5 9 6 . 
. . 8 6 9 9 9 9 9 5 5 5 6 6 . . 
. . . 8 8 8 8 8 8 8 8 6 6 . . . 
`)
anim.addAnimationFrame(img`
. . . . . . . . . . 6 5 6 . . . 
. . . . . . . . . 6 5 6 . . . . 
. . . . . . . . . 6 8 . . . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. . . . 6 6 5 9 1 f 5 5 9 f . . 
. . . . 6 5 5 1 f f 5 9 2 8 . . 
. . . . 6 5 5 9 f 6 9 9 2 2 . . 
6 9 9 9 6 6 9 5 5 5 2 2 2 2 2 6 
6 6 9 5 5 5 6 5 5 2 2 2 2 2 6 . 
6 9 8 5 5 5 5 9 5 5 5 5 5 6 . . 
8 9 9 8 9 5 5 6 5 5 5 5 5 5 6 . 
8 6 9 9 8 8 6 5 5 5 5 5 5 5 6 . 
. 8 9 9 9 9 9 9 5 5 5 5 5 9 6 . 
. . 8 6 9 9 9 9 9 5 5 5 6 6 . . 
. . . 8 8 8 8 8 8 8 8 6 6 . . . 
`)
anim.addAnimationFrame(img`
. . . . . . . . . . 6 5 6 . . . 
. . . . . . . . . 6 5 6 . . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. . . . 6 6 5 9 1 f 5 9 2 8 . . 
. . . . 6 5 5 1 f f 9 9 2 2 2 6 
. . . . 6 5 5 9 f 6 2 2 2 2 6 . 
. . . 6 9 5 5 5 5 2 2 2 2 6 . . 
. . 6 9 9 5 5 5 5 5 5 5 5 6 . . 
. 6 9 9 9 9 5 5 5 5 5 5 5 5 6 . 
6 9 9 9 6 6 6 5 5 5 5 5 5 5 6 . 
8 9 9 6 5 5 9 8 5 5 5 5 5 5 6 . 
8 6 6 9 5 9 8 9 5 5 5 5 5 5 6 . 
. 6 5 5 6 8 9 9 5 5 5 5 5 9 6 . 
6 6 8 8 8 9 9 9 9 5 5 5 6 6 . . 
. . . 8 8 8 8 8 8 8 8 6 6 . . . 
`)
anim.addAnimationFrame(img`
. . . . . . . . . . 6 5 6 . . . 
. . . . . . . . . 6 5 6 . . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. . . . 6 6 5 9 1 f 5 9 2 8 . . 
. . . . 6 5 5 1 f f 9 9 2 2 2 6 
. . . . 6 5 5 9 f 6 2 2 2 2 6 . 
. . . 6 9 5 5 5 5 2 2 2 2 6 . . 
. 6 6 9 9 9 5 5 5 5 5 5 5 6 . . 
6 9 9 9 6 6 6 5 5 5 5 5 5 5 6 . 
8 9 9 6 5 5 9 8 5 5 5 5 5 5 6 . 
8 6 6 9 5 9 8 9 5 5 5 5 5 5 6 . 
8 6 5 5 6 8 9 9 5 5 5 5 5 5 6 . 
6 6 8 8 8 9 9 9 5 5 5 5 5 9 6 . 
. . . . 8 8 9 9 9 5 5 5 6 6 . . 
. . . . . . 8 8 8 8 8 6 6 . . . 
`)
anim.addAnimationFrame(img`
. . . . . . . . . . 6 5 6 . . . 
. . . . . . . . . 6 5 6 . . . . 
. . . . . . 6 6 6 6 6 6 . . . . 
. . . . . 6 6 5 5 5 5 5 6 . . . 
. . . . 6 6 5 9 1 f 5 5 9 f . . 
. . . . 6 5 5 1 f f 5 9 2 8 . . 
. . . . 6 5 5 9 f 6 9 9 2 2 . . 
. 6 6 6 9 5 5 5 5 5 2 2 2 2 2 6 
6 9 9 9 6 6 9 5 5 2 2 2 2 2 6 . 
6 6 9 5 5 5 6 5 5 5 5 5 5 6 . . 
8 9 8 5 5 5 5 9 5 5 5 5 5 5 6 . 
8 6 9 8 9 5 5 6 5 5 5 5 5 5 6 . 
. 8 9 9 8 8 6 9 5 5 5 5 5 9 6 . 
. . 8 6 9 9 9 9 9 5 5 5 6 6 . . 
. . . 8 8 8 8 8 8 8 8 6 6 . . . 
. . . . . . . . . . . . . . . . 
`)
animation.attachAnimation(mySprite, anim)
game.onUpdateInterval(1500, function () {
    gap = Math.randomRange(0, 3)
    if (gap == 0) {
        topImage = img`
. . . . . 6 e e e e e e e e e e c e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 6 6 6 6 e e e e 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 e e 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e . . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e . . . . . . 
. . . . . . e e e e e 7 e e e e e e . . . . . . 
. . . . . . e e e 7 7 7 7 7 e e e e . . . . . . 
. . . . . . e e e 7 7 7 7 7 e e e e . . . . . . 
. . . . . . e e e 7 e e e 7 e e e e . . . . . . 
. . . . . . b e e e e e e e e e e b . . . . . . 
. . . . . . . b e e e e e e e e b . . . . . . . 
. . . . . . . . b e e e e e e b . . . . . . . . 
`
        bottomImage = img`
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . b b b b . . . . . . . . . . 
. . . . . . . . b b d d d d b b . . . . . . . . 
. . . . . . . b d d b b b b d d b . . . . . . . 
. . . . . . b d b b d d d d b b d b . . . . . . 
. . . . . b d b b d b b b b d b b d b . . . . . 
. . . . . b d b d b d d d d b d b d b . . . . . 
. . . . . c d b b d b b b b d b b d c . . . . . 
. . . . . c b d b b d d d d b b d b c . . . . . 
. . . . . e f b d d b b b b d d b c e . . . . . 
. . . . . e e f f b d d d d b c c e e . . . . . 
. . . . . e e e e f f c c c c e e e . . . . . . 
. . . . . c e e e e e e e e e e e e . . . . . . 
. . . . . c e e e e 7 e 7 e e e e e . . . . . . 
. . . . . f e e e e e 7 e e e e e e . . . . . . 
. . . . . c c e e e 7 7 7 e e e e e . . . . . . 
. . . . . . f e e e 7 e 7 e e e e e . . . . . . 
. . . . . 6 f c e e e e e e e e e e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 6 7 7 6 . . . 
. . 6 7 7 6 8 e 6 7 7 6 6 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 7 7 e c e e . . . . 
. . . . . . e e 6 e e e e e e 6 e e f . . . . . 
. . . . . . e e e e 7 e 7 e e e e e f . . . . . 
. . . . . . e e e e e 7 e e e e e e f . . . . . 
. . . . . . e e e e 7 7 7 e e e e c f . . . . . 
. . . . . . c e e e 7 e 7 e e e e c f . . . . . 
. . . . . . c e e e e e e e e e e f f . . . . . 
. . . . . . f e e e e e e e e e e f e . . . . . 
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e 6 e e e e e e 6 c e . . . . . . 
. . . . . . e e f e 7 e 7 e e e c e . . . . . . 
. . . . . . e e c e e 7 e e e e c e . . . . . . 
. . . . . . e e c e 7 7 7 e e e f e . . . . . . 
. . . . . . e e c e 7 e 7 e e e f e . . . . . . 
. . . . . . e e e e e e e e e e f e . . . . . . 
. . . . . . e e e e e e e e e e c e . . . . . . 
. . . . . 6 e e e e e e e e e e c e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 6 6 6 6 e e e e 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 e e 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . c e 6 e e e e e e 6 e e . . . . . . 
. . . . . . c e e e e e e e e e e e . . . . . . 
. . . . . . f c c 7 7 e 7 7 e c e e . . . . . . 
. . . . . . f c c 7 7 e 7 7 e c c e . . . . . . 
. . . . . . f c c e e 7 c c e c c c . . . . . . 
. . . . . . f c c 7 7 7 7 7 e c c c . . . . . . 
. . . . . . f c c 7 7 7 7 7 e e c c . . . . . . 
. . . . . 6 f c c 7 c c c 7 c c c f 6 . . . . . 
. . . . 6 7 7 6 c c c c c c c c c 6 7 6 . . . . 
. . . 6 7 7 6 6 7 6 c c c c 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 c c 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c c 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c c 7 7 c c c c 6 7 c f . . . . . . 
. . . . . . c c 6 c c c c c c 6 c f . . . . . . 
`
    } else if (gap == 1) {
        topImage = img`
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e 6 e e e e e e 6 c e . . . . . . 
. . . . . . e e f e 7 7 e 7 7 e c e . . . . . . 
. . . . . . e e c e 7 7 e 7 7 e c e . . . . . . 
. . . . . . e e c e e e 7 e e e f e . . . . . . 
. . . . . . e e c e 7 7 7 7 7 e f e . . . . . . 
. . . . . . e e e e 7 7 7 7 7 e f e . . . . . . 
. . . . . . e e e e 7 e e e 7 e c e . . . . . . 
. . . . . 6 e e e e e e e e e e c e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 6 6 6 6 e e e e 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 e e 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e . . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e . . . . . . 
. . . . . . e e e e e 7 e e e e e e . . . . . . 
. . . . . . e e e 7 7 7 7 7 e e e e . . . . . . 
. . . . . . e e e 7 7 7 7 7 e e e e . . . . . . 
. . . . . . e e e 7 e e e 7 e e e e . . . . . . 
. . . . . . b e e e e e e e e e e b . . . . . . 
. . . . . . . b e e e e e e e e b . . . . . . . 
. . . . . . . . b e e e e e e b . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
`
        bottomImage = img`
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . b b b b . . . . . . . . . . 
. . . . . . . . b b d d d d b b . . . . . . . . 
. . . . . . . b d d b b b b d d b . . . . . . . 
. . . . . . b d b b d d d d b b d b . . . . . . 
. . . . . b d b b d b b b b d b b d b . . . . . 
. . . . . b d b d b d d d d b d b d b . . . . . 
. . . . . c d b b d b b b b d b b d c . . . . . 
. . . . . c b d b b d d d d b b d b c . . . . . 
. . . . . e f b d d b b b b d d b c e . . . . . 
. . . . . e e f f b d d d d b c c e e . . . . . 
. . . . . e e e e f f c c c c e e e . . . . . . 
. . . . . c e e e e e e e e e e e e . . . . . . 
. . . . . c e e e e 7 e 7 e e e e e . . . . . . 
. . . . . f e e e e e 7 e e e e e e . . . . . . 
. . . . . c c e e e 7 7 7 e e e e e . . . . . . 
. . . . . . f e e e 7 e 7 e e e e e . . . . . . 
. . . . . 6 f c e e e e e e e e e e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 6 7 7 6 . . . 
. . 6 7 7 6 8 e 6 7 7 6 6 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 7 7 e c e e . . . . 
. . . . . . e e 6 e e e e e e 6 e e f . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e f . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e f . . . . . 
. . . . . . e e e e e 7 e e e e e c f . . . . . 
. . . . . . c e e 7 7 7 7 7 e e e c f . . . . . 
. . . . . . c e e 7 7 7 7 7 e e e f f . . . . . 
. . . . . . f e e 7 e e e 7 e e e f e . . . . . 
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e 6 e e e e e e 6 c e . . . . . . 
. . . . . . e e f e 7 e 7 e e e c e . . . . . . 
. . . . . . e e c e e 7 e e e e c e . . . . . . 
. . . . . . e e c e 7 7 7 e e e f e . . . . . . 
. . . . . . e e c e 7 e 7 e e e f e . . . . . . 
. . . . . . e e e e e e e e e e f e . . . . . . 
. . . . . . e e e e e e e e e e c e . . . . . . 
. . . . . 6 e e e e e e e e e e c e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 6 6 6 6 e e e e 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 e e 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . c e 6 e e e e e e 6 e e . . . . . . 
`
    } else if (gap == 2) {
        topImage = img`
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e e e . . . . 
. . . . . . e e 6 e e e e e e 6 c e f . . . . . 
. . . . . . e e e e 7 e 7 e e e e e f . . . . . 
. . . . . . e e e e e 7 e e e e e e f . . . . . 
. . . . . . e e e e 7 7 7 e e e e c f . . . . . 
. . . . . . e e e e 7 e 7 e e e e c f . . . . . 
. . . . . . e e e e e e e e e e e f f . . . . . 
. . . . . . f e e e e e e e e e e f e . . . . . 
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e 6 e e e e e e 6 c e . . . . . . 
. . . . . . e e f e 7 7 e 7 7 e c e . . . . . . 
. . . . . . e e c e 7 7 e 7 7 e c e . . . . . . 
. . . . . . e e c e e e 7 e e e f e . . . . . . 
. . . . . . e e c e 7 7 7 7 7 e f e . . . . . . 
. . . . . . e e e e 7 7 7 7 7 e f e . . . . . . 
. . . . . . e e e e 7 e e e 7 e c e . . . . . . 
. . . . . 6 e e e e e e e e e e c e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 6 6 6 6 e e e e 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 e e 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . e e e e 7 e 7 e e e e e . . . . . . 
. . . . . . e e e e e 7 e e e e e e . . . . . . 
. . . . . . e e e e 7 7 7 e e e e e . . . . . . 
. . . . . . e e e e 7 e 7 e e e e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . b e e e e e e e e e e b . . . . . . 
. . . . . . . b e e e e e e e e b . . . . . . . 
. . . . . . . . b e e e e e e b . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
`
        bottomImage = img`
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . b b b b . . . . . . . . . . 
. . . . . . . . b b d d d d b b . . . . . . . . 
. . . . . . . b d d b b b b d d b . . . . . . . 
. . . . . . b d b b d d d d b b d b . . . . . . 
. . . . . b d b b d b b b b d b b d b . . . . . 
. . . . . b d b d b d d d d b d b d b . . . . . 
. . . . . c d b b d b b b b d b b d c . . . . . 
. . . . . c b d b b d d d d b b d b c . . . . . 
. . . . . e f b d d b b b b d d b c e . . . . . 
. . . . . e e f f b d d d d b c c e e . . . . . 
. . . . . e e e e f f c c c c e e e . . . . . . 
. . . . . c e e e e e e e e e e e e . . . . . . 
. . . . . c e e e e 7 e 7 e e e e e . . . . . . 
. . . . . f e e e e e 7 e e e e e e . . . . . . 
. . . . . c c e e e 7 7 7 e e e e e . . . . . . 
. . . . . . f e e e 7 e 7 e e e e e . . . . . . 
. . . . . 6 f c e e e e e e e e e e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 6 7 7 6 . . . 
. . 6 7 7 6 8 e 6 7 7 6 6 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 7 7 e c e e . . . . 
. . . . . . e e 6 e e e e e e 6 e e f . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e f . . . . . 
. . . . . . e e e 7 7 e 7 7 e e e e f . . . . . 
. . . . . . e e e e e 7 e e e e e c f . . . . . 
. . . . . . c e e 7 7 7 7 7 e e e c f . . . . . 
. . . . . . c e e 7 7 7 7 7 e e e f f . . . . . 
. . . . . . f e e 7 e e e 7 e e e f e . . . . . 
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e 6 e e e e e e 6 c e . . . . . . 
`
    } else {
        topImage = img`
. . . . . 6 f c e e e e e e e e e e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 6 7 7 6 . . . 
. . 6 7 7 6 8 e 6 7 7 6 6 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 7 7 e c e e . . . . 
. . . . . . e e 6 e e e e e e 6 e e f . . . . . 
. . . . . . e e e 7 e 7 e e e e e e f . . . . . 
. . . . . . e e e e 7 e e e e e e e f . . . . . 
. . . . . . e e e 7 7 7 e e e e e c f . . . . . 
. . . . . . c e e 7 e 7 e e e e e c f . . . . . 
. . . . . . c e e e e e e e e e e f f . . . . . 
. . . . . . f e e e e e e e e e e f e . . . . . 
. . . . . 6 f e e e e e e e e e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e e e . . . . 
. . . . . . e e 6 e e e e e e 6 c e f . . . . . 
. . . . . . e e e e e e e e e e e e f . . . . . 
. . . . . . e e e e 7 7 e 7 7 e e e f . . . . . 
. . . . . . e e e e 7 7 e 7 7 e e c f . . . . . 
. . . . . . e e e e e e 7 e e e e c f . . . . . 
. . . . . . e e e e 7 7 7 7 7 e e f f . . . . . 
. . . . . . f e e e 7 7 7 7 7 e e f e . . . . . 
. . . . . 6 f e e e 7 7 e 7 7 e e f 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 7 7 7 6 . . . 
. . 6 7 7 6 e e 6 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e 6 e e e e e e 6 c e . . . . . . 
. . . . . . e e f e e e e e e e c e . . . . . . 
. . . . . . e e c e 7 e 7 e e e c e . . . . . . 
. . . . . . e e c e e 7 e e e e f e . . . . . . 
. . . . . . e e c e 7 7 7 e e e f e . . . . . . 
. . . . . . e e e e 7 e 7 e e e f e . . . . . . 
. . . . . . e e e e e e e e e e c e . . . . . . 
. . . . . 6 e e e e e e e e e e c e 6 . . . . . 
. . . . 6 7 7 6 e e e e e e e e e 6 7 6 . . . . 
. . . 6 7 7 6 6 6 6 e e e e 6 7 6 6 7 7 6 . . . 
. . 6 7 7 6 e e 7 7 7 7 7 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 c e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . c e 7 7 e e e e 6 7 e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . e e e e 7 e 7 e e e e e . . . . . . 
. . . . . . e e e e e 7 e e e e e e . . . . . . 
. . . . . . e e e e 7 7 7 e e e e e . . . . . . 
. . . . . . e e e e 7 e 7 e e e e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . e e e e e e e e e e e e . . . . . . 
. . . . . . b e e e e e e e e e e b . . . . . . 
. . . . . . . b e e e e e e e e b . . . . . . . 
. . . . . . . . b e e e e e e b . . . . . . . . 
. . . . . . . . . . . . . . . . . . . . . . . . 
`
        bottomImage = img`
. . . . . . . . . . . . . . . . . . . . . . . . 
. . . . . . . . . . b b b b . . . . . . . . . . 
. . . . . . . . b b d d d d b b . . . . . . . . 
. . . . . . . b d d b b b b d d b . . . . . . . 
. . . . . . b d b b d d d d b b d b . . . . . . 
. . . . . b d b b d b b b b d b b d b . . . . . 
. . . . . b d b d b d d d d b d b d b . . . . . 
. . . . . c d b b d b b b b d b b d c . . . . . 
. . . . . c b d b b d d d d b b d b c . . . . . 
. . . . . e f b d d b b b b d d b c e . . . . . 
. . . . . e e f f b d d d d b c c e e . . . . . 
. . . . . e e e e f f c c c c e e e . . . . . . 
. . . . . c e e e e e e e e e e e e . . . . . . 
. . . . . c e e e 7 7 e 7 7 e e e e . . . . . . 
. . . . . f e e e 7 7 e 7 7 e e e e . . . . . . 
. . . . . c c e e e e 7 e e e e e e . . . . . . 
. . . . . . f e e 7 7 7 7 7 e e e e . . . . . . 
. . . . . 6 f c e 7 7 7 7 7 e e e e 6 . . . . . 
. . . . 6 7 7 6 e 7 e e e 7 e e e 6 7 6 . . . . 
. . . 6 7 7 7 6 6 6 e e e e 6 6 6 6 7 7 6 . . . 
. . 6 7 7 6 8 e 6 7 7 6 6 7 7 7 6 6 7 7 7 6 . . 
. . . 6 6 8 e e 7 7 6 8 8 6 7 7 8 8 6 6 6 . . . 
. . . . . . e e 7 7 e e e e 7 7 e c e e . . . . 
. . . . . . e e 6 e e e e e e 6 e e f . . . . . 
`
    }
    gapImage = image.create(2, scene.screenHeight())
    gapImage.fill(1)
    gapSprite = sprites.create(gapImage, SpriteKind.Gap)
    gapSprite.setFlag(SpriteFlag.AutoDestroy, true)
    gapSprite.setFlag(SpriteFlag.Invisible, true)
    gapSprite.left = scene.screenWidth()
    gapSprite.vx = -45
    projectile = sprites.createProjectileFromSide(topImage, -45, 0)
    projectile.top = 0
    projectile = sprites.createProjectileFromSide(bottomImage, -45, 0)
    projectile.bottom = scene.screenHeight()
})
game.onUpdate(function () {
    if (mySprite.vy > 0) {
        animation.setAction(mySprite, ActionKind.Idle)
    }
    if (mySprite.bottom > 120 || mySprite.top < 0) {
        game.over(false)
    }
})
