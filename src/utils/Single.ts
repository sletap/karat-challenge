// This file is used to ensure that we push metadata to the card on startup
// This protects us from outdated metadata if the webhooks weren't processed
// Note that because of the way that next works in dev it runs twice because of recompilation in between api calls
// On production this works as expected

class Single {
  private _done: boolean = false;

  public get done(): boolean {
    return this._done;
  }

  public set done(done: boolean) {
    this._done = done;
  }
}

const single = new Single();
export default single;
