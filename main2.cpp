#include <iostream>
#include "parser.h"
#include "Functions.h"
#include "Date.h"

using namespace std;

int main()
{
    parsingData();
    int choice = 0;
    bool ascending = true;
    string date;
    string country;
    Date start ;
    Date end ;
    int startRange;
    int endRange;
    float price;
    float latitude;
    float longitude;
    int radius;
    float latitude1;
    float longitude1;
    float latitude2;
    float longitude2;

    do
    {
    cout << "\nSelect an option:" << endl;
    cout << "1. Print cars sorted by make" << endl;
    cout << "2. Print cars sorted by make and model" << endl;
    cout << "3. Print cars sorted by age" << endl;
    cout << "4. Print cars sorted by purchase date" << endl;
    cout << "5. Print cars sorted by price" << endl;
    cout << "6. Search by date range" << endl;
    cout << "7. Search by price range" << endl;
    cout << "8. Search by Price" << endl;
    cout << "9. Search by country" << endl;
    cout << "10. Search by dealer location coordinates" << endl;
    cout << "11. Search by location and radius" << endl;
    cout << "12. Search by rectangle coordinates" << endl;
    cout << "13. Print map" << endl;
    cout << "14. Exit" << endl;
    cout << "Enter your choice: ";

    cin >> choice;

    if (choice <= 1 && choice >= 5)
    {
        cout << "Select a sorting method:" << endl;
        cout << "0. Descending" << endl;
        cout << "1. Ascending" << endl;
        cin >> ascending;
    }


    switch (choice)
    {
    case 1:
        sortedPrint("make", ascending);
        break;

    case 2:
        sortedPrint("make and model", ascending);
        break;

    case 3:
        sortedPrint("age", ascending);
        break;

    case 4:
        sortedPrint("date", ascending);
        break;

    case 5:
        sortedPrint("price", ascending);
        break;

    case 6:
        cout << "Enter a start date (DD/MM/YYYY): ";
        cin >> date;
        start=Date(date);
        cout << "Enter an end date (DD/MM/YYYY): ";
        cin >> date;
        end=Date(date);
        searchByDateRange(start, end);
        break;

    case 7:
        cout << "Price Ranges:" << endl;
        cout << "1. 10,000 - 20,000" << endl;
        cout << "2. 20,000 - 30,000" << endl;   
        cout << "3. 30,000 - 40,000" << endl;
        cout << "4. 40,000 - 50,000" << endl;
        cout << "5. 50,000 - 60,000" << endl;
        cout << "6. 60,000 - 70,000" << endl;
        cout << "7. 70,000 - 80,000" << endl;
        cout << "8. 80,000 - 90,000" << endl;
        cout << "Select starting Price Range: "; 
        cin >> startRange;
        cout << "Select ending Price Range: ";
        cin >> endRange;
        searchByPriceRange(startRange*10000, (endRange+1)*10000);
        break;

    case 8:
        cout << "Enter a price: ";
        cin >> price;
        searchByPrice(price);
        break;

    case 9:
        cout << "Enter a country: ";
        cin >> country;
        searchByCountry(country);
        break;

    case 10:
        cout << "Search by dealer location coordinates" << endl;
        cout << "Enter a latitude: ";
        cin >> latitude;
        cout << "Enter a longitude: ";
        cin >> longitude;
        searchByCoordinates(latitude, longitude);
        break;
    case 11:
        cout << "Enter a latitude: ";
        cin >> latitude;
        cout << "Enter a longitude: ";
        cin >> longitude;
        cout << "Enter a radius (number of surrounding regions): ";
        searchByLocation(latitude, longitude, radius);
        break;

    case 12:
        cout << "Enter a latitude1: ";
        cin >> latitude1;
        cout << "Enter a longitude1: ";
        cin >> longitude1;
        cout << "Enter a latitude2: ";
        cin >> latitude2;
        cout << "Enter a longitude2: ";
        cin >> longitude2;
        searchByRectangle(latitude1, longitude1, latitude2, longitude2);
        break;

    case 13:
        printMap();
        break;

    case 14:
        cout << "Goodbye!" << endl;
        break;

    default:
        cout << "Invalid choice. Please try again." << endl;
        break;
    }

    } while (choice != 14);

    return 0;

}
