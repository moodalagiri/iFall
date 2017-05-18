
import argparse
import datetime
import imutils
import time
import cv2
import MySQLdb
import datetime
import twilio
import twilio.rest

ap = argparse.ArgumentParser()
ap.add_argument("-v", "--video", help="path to the video file")
ap.add_argument("-a", "--min-area", type=int, default=500, help="minimum area size")
args = vars(ap.parse_args())


if args.get("video", None) is None:
    camera = cv2.VideoCapture(0)
    time.sleep(0.25)
else:
    camera = cv2.VideoCapture(args["video"])

def timeout():
    return "Timer reset"

firstFrame = None
fallCounter = 0
start = 0
per_height = 170
per_width = 40

per_ar = per_width/float(per_height)
falldetected = False

while True:
    (grabbed, frame) = camera.read()
    text = "person not available"

    if not grabbed:
        break

    frame = imutils.resize(frame, width=500)
    fps = camera.get(cv2.CAP_PROP_FPS)
    print "fps : ",fps
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (21, 21), 0)


    if firstFrame is None:
        firstFrame = gray
        continue


    frameDelta = cv2.absdiff(firstFrame, gray)
    thresh = cv2.threshold(frameDelta, 25, 255, cv2.THRESH_BINARY)[1]


    thresh = cv2.dilate(thresh, None, iterations=2)
    (_,cnts,_) = cv2.findContours(thresh.copy(), cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)


    for c in cnts:
        if cv2.contourArea(c) < args["min_area"]:
            continue

        (x, y, w, h) = cv2.boundingRect(c)

        print "Dimensions"
        print x,x+w,y,y+h
        current_dim = h/float(w)
        print "current dimension : height/width",current_dim
        print "person's dimension : ",per_ar
        if current_dim <= per_ar + 0.2 and  current_dim >= per_ar - 0.2 :
            print "ar is 0"

            if start == 0:
                start = time.time()

            if time.time() - start >= 10:
                print time.time() - start
                print "Fall Detected"
                falldetected = True
                break

        else:
            start = 0

        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        #if(x+y )
        text = "Person available"

    if falldetected:
        print("Fall Detected")
        # Your Account SID from twilio.com/console
        account_sid = "ACfc4677940718d1a804ca8c7a477b3e2c"
        # our Auth Token from twilio.com/console
        auth_token  = "9ec44d949b2434b77ed614bd22c58588"

        client = twilio.rest.TwilioRestClient(account_sid, auth_token)
        person_name="vasu"
        toNumber= "+15104587586"
        message = client.messages.create(
            to=toNumber,
            from_="+19785400942",
            body="Medical attention required for : "+person_name+" Person has fallen down and is unconscious")
        try:
            db = MySQLdb.connect("localhost","root","Sai*1234","falldetection" )
            cursor = db.cursor()
            fallDetectedSJSU = """INSERT INTO fall_report(id,patientname,falldate) VALUES ('%s','%s','%s')""" % ("1","vasu",datetime.datetime.now())
            cursor.execute(fallDetectedSJSU)
            db.commit()

        except MySQLdb.Error as e:
            print("ERROR: Something went wrong: {}".format(e))

        finally:
            cursor.close()
            db.close()

        break

    cv2.putText(frame, "Person status: {}".format(text), (10, 20),
                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
    cv2.putText(frame, datetime.datetime.now().strftime("%A %d %B %Y %I:%M:%S%p"),
                (10, frame.shape[0] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.35, (0, 0, 255), 1)


    cv2.imshow("FALL DETECTION FEED", frame)
    cv2.imshow("Threshold", thresh)
    cv2.imshow("Background Feed", frameDelta)
    key = cv2.waitKey(1) & 0xFF


    if key == ord("q"):
        break

camera.release()
cv2.destroyAllWindows()





