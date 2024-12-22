#pragma once
#include <string>
using namespace std;

class Date //definitino of class Dictionary
{
  public:
    int day;
    int month;
    int year;

    Date() //default constructor
    {
      day = 0;
      month = 0;
      year = 0;
    }

    Date(int d, int m, int y) //constructor with parameters
    {
      day = d;
      month = m;
      year = y;
    }

    Date (string date) //constructor with parameters
    {
      int d = stoi(date.substr(0, 2));
      int m = stoi(date.substr(3, 2));
      int y = stoi(date.substr(6, 4));
      day = d;
      month = m;
      year = y;
    }

    //overloading of boolean comparison operators for sotring data in list
    bool operator==(Date date)
    {
      return day == date.day && month == date.month && year == date.year;
    }
    bool operator>(Date date)
    {
      return year > date.year || (year == date.year && month > date.month) || (year == date.year && month == date.month && day > date.day);
    }
    bool operator<(Date date)
    {
      return year < date.year || (year == date.year && month < date.month) || (year == date.year && month == date.month && day < date.day);
    }
    bool operator>=(Date date)
    {
      return year > date.year || (year == date.year && month > date.month) || (year == date.year && month == date.month && day >= date.day);
    }
    bool operator<=(Date date)
    {
      return year < date.year || (year == date.year && month < date.month) || (year == date.year && month == date.month && day <= date.day);
    }
    bool operator!=(Date date)
    {
      return day != date.day || month != date.month || year != date.year;
    }

    // << was overloaded for printing and file writing purposes
    friend ostream& operator<<(ostream& os, const Date& date)
    {
      os << date.day << "-" << date.month << "-" << date.year;
      return os;
    }
};
