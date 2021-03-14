import {Activity, useLanyard} from 'use-lanyard';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Song} from './song';
import {Consts} from '../core/consts';

dayjs.extend(relativeTime);

const PRESENCE_TYPE = 0;

export function Activity() {
  const {data: lanyard} = useLanyard(Consts.DiscordId);

  const activity = lanyard?.activities.find((activity) => activity.type === PRESENCE_TYPE);

  return (
    <div className="glass p-5">
      {activity && (
        <div className="flex items-center">
          <ActivityImage activity={activity} />
          <p className="ml-4 flex flex-col justify-between leading-snug">
            <span className="text-xl font-bold">{activity.name}</span>
            <span className="opacity-50">{activity.state}</span>
            <span className="opacity-50">{activity.details}</span>
            <span className="opacity-50">{dayjs(activity.timestamps?.start).fromNow(true)} elapsed</span>
          </p>
        </div>
      )}

      <Song />
    </div>
  );
}

function ActivityImage({activity}: {activity: Activity}) {
  if (!activity.assets) return null;

  try {
    return (
      <img
        src={`https://cdn.discordapp.com/app-assets/${BigInt(activity.application_id).toString()}/${
          activity.assets.large_image
        }.png`}
        alt={activity.assets.large_text}
        className="h-24 rounded-md"
      />
    );
  } catch (e) {
    return null;
  }
}
