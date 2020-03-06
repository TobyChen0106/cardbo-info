import csv
import pymongo

# def unicode_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
#     csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
#     for row in csv_reader:
#         yield [unicode(cell, 'utf-8') for cell in row]

# filename = 'tempData-1.csv'
# reader = unicode_csv_reader(open(filename))
# for field1, field2, field3 in reader:
#   print (field1, field2, field3 )


with open('tempData-1.csv',  'r', encoding='BIG5', newline='') as f:
    data = list(csv.reader(f))
    
    # client = pymongo.MongoClient("mongodb+srv://Toby0106:dbforcardbo@cluster0-gfwld.mongodb.net/test?retryWrites=true&w=majority")
    # db = client["cardbo-db"]
    # collect = db["infos"]
    cards = {}
    for info in data:
        infoData = {
            "infoID": info[1],
            "cardID": info[1][:6],
            "cardName": info[0],
            "infoTitle": info[2],
            "infoSummary": info[4],
            "dueDate": info[3],
            "contents": info[5],
            "tags": "",
            "note": ""
        }
        # post_id = collect.insert_one(infoData).inserted_id
        # print( ' card data postID:　',post_id)
        
        # print(infoData)
        if(not info[0] in cards):
            cards.update({info[0]:info[1][:6]})
    print(cards)