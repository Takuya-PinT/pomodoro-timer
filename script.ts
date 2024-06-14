class PomodoroTimer {
    private workTime: number;
    private breakTime: number;
    private isRunning: boolean;
    private isWorkSession: boolean;
    private timer: NodeJS.Timeout | null = null;
    private timeLeft: number;

    constructor(private display: HTMLElement) {
        this.workTime = 25 * 60;
        this.breakTime = 5 * 60;
        this.isRunning = false;
        this.isWorkSession = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
    }

    start(): void {
        if (this.isRunning) return;
        this.isRunning = true;
        this.timer = setInterval(this.tick.bind(this), 1000);
    }

    stop(): void {
        if (!this.isRunning) return;
        this.isRunning = false;
        if (this.timer) clearInterval(this.timer);
    }

    reset(): void {
        this.stop();
        this.isWorkSession = true;
        this.timeLeft = this.workTime;
        this.updateDisplay();
    }

    private tick(): void {
        if (this.timeLeft > 0) {
            this.timeLeft--;
        } else {
            this.isWorkSession = !this.isWorkSession;
            this.timeLeft = this.isWorkSession ? this.workTime : this.breakTime;
            alert(
                this.isWorkSession
                ? "Work session ended! Time for a break."
                : "Break ended! Time to get back to work."
            );
        }
        this.updateDisplay();
    }

    private updateDisplay(): void {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.display.textContent = `${minutes}:${
            seconds < 10 ? "0" : ""
        }${seconds}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const timerElement = document.getElementById("timer") as HTMLElement;
    const startButton = document.getElementById(
        "start-button"
    ) as HTMLButtonElement;
    const stopButton = document.getElementById(
        "stop-button"
    ) as HTMLButtonElement;
    const resetButton = document.getElementById(
        "reset-button"
    ) as HTMLButtonElement;

    console.log(timerElement)
    const pomodoroTimer = new PomodoroTimer(timerElement);

    startButton.addEventListener("click", () => pomodoroTimer.start());
    stopButton.addEventListener("click", () => pomodoroTimer.stop());
    resetButton.addEventListener("click", () => pomodoroTimer.reset());
});
