export const ChooseTravelDistance = ({ setHours, setMinutes }) => {
  return (
    <section id="distance_traveling">
      <div>
        <h3>
          For how far are you willing to travel with your desired way of
          transportation
        </h3>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="hrs">Hours</label>
            <input
              onChange={(e) => setHours(e.target.value)}
              className="border-2"
              type="number"
              required
              name="hrs"
              id=""
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="mns">Minutes</label>
            <input
              onChange={(e) => setMinutes(e.target.value)}
              max="60"
              min="0"
              className="border-2"
              type="number"
              required
              name="mns"
              id=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};
