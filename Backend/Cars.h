#pragma once
#include "Date.h"

using namespace std;

class Car
{
    public:
    string make;
    string model;
    string buyer_gender;
    int buyer_age;
    string country;
    string city;
    float dealer_latitude;
    float dealer_longitude;
    string color;
    bool new_car;
    Date purchase_date;
    float sale_price;
    float top_speed;
    string id;

     bool operator==(Car car)
    {
      return make == car.make && model == car.model;
    }
    bool operator!=(Car car)
    {
      return make != car.make || model != car.model;
    }
    bool operator<(Car car)
    {
      return make < car.make || (make == car.make && model < car.model);
    }
    bool operator>(Car car)
    {
      return make > car.make || (make == car.make && model > car.model);
    }
    bool operator<=(Car car)
    {
      return make < car.make || (make == car.make && model <= car.model);
    }
    bool operator>=(Car car)
    {
      return make > car.make || (make == car.make && model >= car.model);
    }

    friend ostream& operator<<(ostream& os, const Car& car)
    {
      string newCar = (car.new_car)? "Yes":"No";
      os << "Car Make: " << car.make << "\tModel: " << car.model << "\tBuyer Gender: " << car.buyer_gender << "\tBuyer Age: " << car.buyer_age << "\tCountry: " << car.country << "\tCity: " << car.city << "\tDealer Latitude: " << car.dealer_latitude << "\tDealer Longitude: " << car.dealer_longitude << "\tColor: " << car.color << "\tNew Car: " << newCar << "\tPurchase Date: " << car.purchase_date << "\tSale Price: " << car.sale_price << "\tTop Speed: " << car.top_speed << endl;
      return os;
    }
    Car ()
    {
        make = "";
        model = "";
        buyer_gender = "";
        buyer_age = 0;
        country = "";
        city = "";
        dealer_latitude = 0;
        dealer_longitude = 0;
        color = "";
        new_car = false;
        purchase_date = Date();
        sale_price = 0;
        top_speed = 0;
        id = "";
    }

    void setID()
    {
        id = make + model + to_string(sale_price);
    }

    string getID()
    {
        return make + model + to_string(sale_price);
    }
};