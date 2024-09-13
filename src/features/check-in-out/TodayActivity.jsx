import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    // <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
    <>
      <h4 className="text-xl font-semibold mb-4 dark:text-gray-500">
        Today Activity
      </h4>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-hidden">
          {activities?.length > 0 ? (
            <ul className="space-y-2">
              {activities.map((activity) => (
                <TodayItem activity={activity} key={activity.id} />
              ))}
            </ul>
          ) : (
            <p className="text-center text-lg font-medium mt-2">
              No activity today...
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default TodayActivity;
