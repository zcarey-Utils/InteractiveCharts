import simplejson as json

# Opening JSON file
f = open('flare.json')
data = json.load(f)
f.close()

# Open output file
f = open('results.txt', 'w')

def writeTabs(tabs):
    for i in range(tabs):
        f.write("\t")
        
def decodeArray(obj, tabs):
    first = True
    for i in obj:
        if not first:
            f.write(",\n")
        first = False
        decodeObject(i, tabs)
    if (len(obj) > 0):
        f.write("\n")

def decodeObject(obj, tabs):
    writeTabs(tabs)
    if('children' in obj):
        f.write("new GroupCategory(\"")
        f.write(obj['name'])
        f.write("\",\n")
        decodeArray(obj['children'], tabs + 1)
        writeTabs(tabs)
        f.write(")")
    else:
        f.write("new GroupValue(\"")
        f.write(obj['name'])
        f.write("\", ")
        f.write(str(obj['value']))
        f.write(")")
        
decodeObject(data, 0)
f.close()