export class GameModel {
    round;
    foundItems;
    itemsForAnimals;
    itemsWantedByAnimals;
    audioForItems;
    hintAudioForAnimals;
    thief;
    time;

    increaseRound() {
        this.round += 1;
    }
}