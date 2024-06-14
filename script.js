var PomodoroTimer = /** @class */ (function () {
    function PomodoroTimer(display) {
        this.display = display;
        this.timer = null;
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.isRunning = false;
        this.isWorkSession = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
    }
    PomodoroTimer.prototype.start = function () {
        if (this.isRunning)
            return;
        this.isRunning = true;
        this.timer = setInterval(this.tick.bind(this), 1000);
    };
    PomodoroTimer.prototype.stop = function () {
        if (!this.isRunning)
            return;
        this.isRunning = false;
        if (this.timer)
            clearInterval(this.timer);
    };
    PomodoroTimer.prototype.reset = function () {
        this.stop();
        this.isWorkSession = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
    };
    PomodoroTimer.prototype.tick = function () {
        if (this.timeLeft > 0) {
            this.timeLeft--;
        }
        else {
            this.isWorkSession = !this.isWorkSession;
            this.timeLeft = this.isWorkSession ? this.workTime : this.breakTime;
            alert(this.isWorkSession
                ? "Work session ended! Time for a break."
                : "Break ended! Time to get back to work.");
        }
        this.updateDisplay();
    };
    PomodoroTimer.prototype.updateDisplay = function () {
        var minutes = Math.floor(this.timeLeft / 60);
        var seconds = this.timeLeft % 60;
        this.display.textContent = "".concat(minutes, ":").concat(seconds < 10 ? "0" : "").concat(seconds);
    };
    return PomodoroTimer;
}());
document.addEventListener("DOMContentLoaded", function () {
    var timerElement = document.getElementById("timer");
    var startButton = document.getElementById("start-button");
    var stopButton = document.getElementById("stop-button");
    var resetButton = document.getElementById("reset-button");
    console.log(timerElement);
    var pomodoroTimer = new PomodoroTimer(timerElement);
    startButton.addEventListener("click", function () { return pomodoroTimer.start(); });
    stopButton.addEventListener("click", function () { return pomodoroTimer.stop(); });
    resetButton.addEventListener("click", function () { return pomodoroTimer.reset(); });
});
