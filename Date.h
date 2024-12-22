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

    Date (string dateStr) //constructor with parameters
    {
      if (dateStr.size() < 8) {
        // Invalid date string, default to something safe
        day = month = year = 0;
        return;
      }
      // Optionally, check characters like '/' in correct places
      // Use try/catch or careful parsing to avoid out-of-range
      try {
        // Example format dd/mm/yyyy
        int d = stoi(dateStr.substr(0, 2));
        int m = stoi(dateStr.substr(3, 2));
        int y = stoi(dateStr.substr(6, 4));
        day = d;
        month = m;
        year = y;
      } catch (...) {
        day = month = year = 0;
      }
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
