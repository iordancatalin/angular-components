import { Injectable } from '@angular/core';
import { Direction } from '../datagrid/datagrid.model';

@Injectable()
export class SortService {
  private comparators: (NumberComparator | DateComparator)[];
  private defaultComparator = new DefaultComparator();

  constructor() {
    this.comparators = [new NumberComparator(), new DateComparator()];
  }

  public sortByProperty<T, K extends keyof T>(
    data: T[],
    property: K,
    direction: Direction
  ): T[] {
    const dataArrayClone = data != null ? [...data] : [];

    const nonNullValue = dataArrayClone.find(
      (value) => value[property] != null
    )?.[property];

    // didn't find a value that is not null for the provided property, return array without sorting
    if (nonNullValue == null) {
      return dataArrayClone;
    }

    // find comparator based on type of the found value
    // asume that data is consitent
    const comparator =
      this.comparators.find((comparator) =>
        comparator.isApplicable(nonNullValue)
      ) ?? this.defaultComparator;

    return dataArrayClone.sort((firtTerm, secondTerm) =>
      this.compareValues(
        firtTerm[property],
        secondTerm[property],
        direction,
        comparator
      )
    );
  }

  /**
   *
   * @param valueOne
   * @param valueTwo
   * @param direction
   *
   * if both values are null then they are equals
   * if one value is null and the other value is not null, the value that is not null will be higher then the null value
   * if both values are not null then use a comparator
   */
  private compareValues(
    valueOne: unknown,
    valueTwo: unknown,
    direction: Direction,
    comparator: NumberComparator | DateComparator | DefaultComparator
  ): number {
    if (valueOne == null && valueTwo == null) {
      return 0;
    }

    if (valueOne == null) {
      return 1;
    }

    if (valueTwo == null) {
      return -1;
    }

    try {
      return comparator.compare(valueOne, valueTwo, direction);
    } catch (err) {
      // if the comparator.compare throws an error then we have inconsitend data
      console.error(
        `Inconsistent data, can't compare type ${typeof valueOne} with type ${typeof valueTwo}`
      );
    }

    return 0;
  }
}

class NumberComparator {
  isApplicable(value: unknown): boolean {
    return typeof value === 'number';
  }

  compare(valueOne: unknown, valueTwo: unknown, direction: Direction): number {
    if (typeof valueOne === 'number' && typeof valueTwo === 'number') {
      if (direction === Direction.ASCENDENT) {
        return valueOne - valueTwo;
      }

      return valueTwo - valueOne;
    }

    throw new Error('Improper use of Number Comparator');
  }
}

class DefaultComparator {
  isApplicable(): boolean {
    return true;
  }

  compare(valueOne: any, valueTwo: any, direction: Direction): number {
    const stringValueOne = valueOne.toString().toUpperCase();
    const stringValueTwo = valueTwo.toString().toUpperCase();

    if (direction === Direction.ASCENDENT) {
      return stringValueOne.localeCompare(stringValueTwo);
    }

    return stringValueTwo.localeCompare(stringValueOne);
  }
}

class DateComparator {
  isApplicable(value: unknown): boolean {
    return value instanceof Date;
  }

  compare(valueOne: unknown, valueTwo: unknown, direction: Direction): number {
    if (valueOne instanceof Date && valueTwo instanceof Date) {
      const valueOneTime = valueOne.getTime();
      const valueTwoTime = valueTwo.getTime();

      if (direction === Direction.ASCENDENT) {
        return valueOneTime - valueTwoTime;
      }

      return valueTwoTime - valueOneTime;
    }

    throw new Error('Improper use of Date Comparator');
  }
}
