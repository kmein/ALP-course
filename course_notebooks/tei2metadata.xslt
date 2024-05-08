<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
    version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    xmlns="http://www.tei-c.org/ns/1.0">

    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:template match="/">
        <xsl:text>id,group,addressee&#10;</xsl:text>
        <xsl:apply-templates select="//tei:div[@type='hymn']"/>
    </xsl:template>

    <xsl:template match="tei:div[@type='hymn']">
        <xsl:variable name="id" select="@xml:id"/>
        <xsl:variable name="group" select="tei:div[@type='dedication']/tei:div[@type='group']/tei:p[@xml:lang='eng']"/>
        <xsl:variable name="addressee" select="tei:div[@type='dedication']/tei:div[@type='addressee']/tei:p[@xml:lang='eng']"/>

        <xsl:value-of select="$id"/>
        <xsl:text>,"</xsl:text>
        <xsl:value-of select="$group"/>
        <xsl:text>","</xsl:text>
        <xsl:value-of select="$addressee"/>
        <xsl:text>"&#10;</xsl:text>
    </xsl:template>

</xsl:stylesheet>
