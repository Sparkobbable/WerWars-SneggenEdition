export class GameModel {
    round;
    foundItems;
    itemsForAnimals;
    itemsWantedByAnimals;
    audioForItems;
    hintAudioForAnimals;
    time;

    increaseRound() {
        this.round += 1;
    }
}