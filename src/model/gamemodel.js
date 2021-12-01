export class GameModel {
    round;
    foundItems;
    itemsForAnimals;
    audioForItems;
    time;

    increaseRound() {
        this.round += 1;
    }
}