import os,re,shutil

def writeFile(byte,file):
    with open(file,'w',encoding='utf-8') as f:
        f.write(byte)
        f.close()
        
def readFile(file):
    with open(file,'rb') as f:
        strs = f.read().decode('utf-8')
        f.close()
        return strs
        
def getDirListTree(path):
    dirss=[]
    for root,dirs,files in os.walk(path):
        for i in dirs:
            dirss.append(os.path.join(root,i))
    return dirss
    
def getDirlists(path):
    dirss = []
    aa = os.listdir(path)
    for i in aa:
        if os.path.isdir(path+i):
            dirss.append(i)
    return dirss

def getFileListTree(path):
    filss=[]
    for root,dirs,files in os.walk(path):
        for i in files:
            filss.append(os.path.join(root,i))
    return filss

def mkdirs(path):
    if os.path.exists(path)==False:
        os.makedirs(path)

def __copyDirChildToPath(now,aim):
    source_dirs=getDirListTree(now)
    for i in source_dirs:
        path = aim+re.sub(now,'',i)
        mkdirs(path)
        
def copyPathChildToPath(now,aim):
    files_list=getFileListTree(now)
    __copyDirChildToPath(now,aim)
    for i in files_list:
        aim_file_path = re.sub(now,aim,i)
        if os.path.exists(aim_file_path):
            os.remove(aim_file_path)
        shutil.copyfile(i,aim_file_path)

def initPath(path):
    if os.path.exists(path):
        shutil.rmtree(path)
    else:
        os.makedirs(path)
        
        
        
