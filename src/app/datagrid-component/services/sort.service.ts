import { Injectable } from '@angular/core';
import { Direction } from '../datagrid/datagrid.model';

@Injectable()
export class SortService {
  private comparators: Comparator[];

  constructor() {
    this.comparators = [
      new NumberComparator(),
      new DateComparator(),
      // Keep string comparator last as the default comparator
      new StringComparator(),
    ];
  }

  public sortByProperty<T, K extends keyof T>(
    data: T[],
    property: K,
    direction: Direction
  ): T[] {
    const dataArrayClone = data != null ? [...data] : [];

    return dataArrayClone.sort((firtTerm, secondTerm) => {
      const firstTermProperty = firtTerm[property];
      const secondTermProperty = secondTerm[property];

      return this.compareValues(
        firstTermProperty,
        secondTermProperty,
        direction
      );
    });
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
    direction: Direction
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

    const comparator = this.comparators.find((comparator) =>
      comparator.isApplicable(valueOne, valueTwo)
    );

    return comparator != null
      ? comparator.compare(valueOne, valueTwo, direction)
      : 0;
  }
}

interface Comparator {
  isApplicable(valueOne: unknown, valueTwo: unknown): boolean;
  compare(valueOne: unknown, valueTwo: unknown, direction: Direction): number;
}

class NumberComparator implements Comparator {
  isApplicable(valueOne: unknown, valueTwo: unknown): boolean {
    return typeof valueOne === 'number' && typeof valueTwo === 'number';
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

class StringComparator implements Comparator {
  isApplicable(): boolean {
    return true;
  }

  compare(valueOne: unknown, valueTwo: unknown, direction: Direction): number {
    const [one, two] = this.castValues(valueOne, valueTwo);

    if (direction === Direction.ASCENDENT) {
      return one.localeCompare(two);
    }

    return two.localeCompare(one);
  }

  private castValues(valueOne: unknown, valueTwo: unknown): string[] {
    const valueOneString = valueOne + '';
    const valueTwoString = valueTwo + '';

    return [valueOneString, valueTwoString];
  }
}

class DateComparator implements Comparator {
  isApplicable(valueOne: unknown, valueTwo: unknown): boolean {
    return valueOne instanceof Date && valueTwo instanceof Date;
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
