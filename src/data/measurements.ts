import dayjs from "dayjs";
import { faker } from "@faker-js/faker";

export type Measurement = {
  id: string;
  deviceID: string;
  temperature: number;
  humid: number;
  pressure: number;
  timestamp: number;
};

const timestamps = [...Array(5).keys()]
  .map((n) => dayjs().subtract(n, "minute"))
  .reverse();

const measurements: Measurement[] = timestamps.map((timestamp, index) => ({
  id: `1-${index}`,
  deviceID: "1",
  temperature: faker.datatype.number({ min: -1000, max: 1000 }),
  humid: faker.datatype.number({ min: -1000, max: 1000 }),
  pressure: faker.datatype.number({ min: -1000, max: 1000 }),
  timestamp: timestamp.valueOf(),
}));

export default measurements;