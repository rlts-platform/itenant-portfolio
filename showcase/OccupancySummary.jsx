/**
 * iTenant portfolio sample — sanitized UI excerpt.
 * Demonstrates a property occupancy summary without backend connections.
 * This is not the production component or full application source.
 */
export default function OccupancySummary({ properties = [] }) {
  const totals = properties.reduce(
    (result, property) => ({
      occupied: result.occupied + (property.occupiedUnits || 0),
      units: result.units + (property.totalUnits || 0),
    }),
    { occupied: 0, units: 0 }
  );

  const occupancyRate =
    totals.units > 0 ? Math.round((totals.occupied / totals.units) * 100) : 0;

  return (
    <section aria-labelledby="occupancy-heading" className="occupancy-summary">
      <h2 id="occupancy-heading">Portfolio Occupancy</h2>
      <p className="occupancy-summary__rate">{occupancyRate}%</p>
      <p>
        {totals.occupied} of {totals.units} units occupied
      </p>
      <ul>
        {properties.map((property) => {
          const rate =
            property.totalUnits > 0
              ? Math.round((property.occupiedUnits / property.totalUnits) * 100)
              : 0;

          return (
            <li key={property.id}>
              <span>{property.name}</span>
              <span>{property.occupiedUnits}/{property.totalUnits} units</span>
              <progress value={rate} max="100" aria-label={`${property.name} occupancy`} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
